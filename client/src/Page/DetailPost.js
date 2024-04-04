import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shortid from "shortid";

import * as env from "../env.js";
import moment from "moment";
export default function DetailPost() {
  const user = localStorage.getItem("dataUser")
    ? JSON.parse(localStorage.getItem("dataUser"))
    : null;
  const { idForum, idDetailForum } = useParams();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [valueReply, setValueReply] = useState({});
  const [checkInputReply, setCheckInputReply] = useState({});
  const fetchDataPost = async () => {
    axios
      .get(env.API_URL + "/account", {})
      .then(function (responseAccount) {
        axios
          .get(env.API_URL + "/posts", {})
          .then(async function (responsePost) {
            let checkExist = await responsePost.data.dataPosts.find(
              (x) => x._id === idDetailForum
            );
            if (checkExist) {
              // console.log(checkExist);
              let user = await responseAccount.data.dataAccounts.find(
                (user) => user._id === checkExist.author
              );
              let listComment = [];
              let obj = {};
              let checkInput = {};
              await checkExist.comments.forEach(async (comment, index) => {
                let listReply = [];
                await comment.reply.forEach(async (reply) => {
                  let authorReply =
                    await responseAccount.data.dataAccounts.find(
                      (x) => x._id === reply.idUser
                    );
                  listReply.push({
                    ...reply,
                    nameAuthor:
                      authorReply.family_name + " " + authorReply.given_name,
                  });
                });
                let authorComment =
                  await responseAccount.data.dataAccounts.find(
                    (x) => x._id === comment.idUser
                  );
                obj[comment.idComment] = "";
                checkInput[comment.idComment] = false;
                listComment.push({
                  ...comment,
                  nameAuthor:
                    authorComment.family_name + " " + authorComment.given_name,
                  reply: listReply,
                });
                if (index === checkExist.comments.length - 1) {
                  setPost({
                    ...checkExist,
                    nameAuthor: user.family_name + " " + user.given_name,
                    comments: listComment.reverse(),
                  });
                  setValueReply(obj);
                  setCheckInputReply(checkInput);
                }
              });
              if (checkExist.comments.length === 0) {
                setPost({
                  ...checkExist,
                  nameAuthor: user.family_name + " " + user.given_name,
                  comments: [],
                });
                setValueReply(obj);
                setCheckInputReply(checkInput);
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDataPost();
  }, []);

  const addComment = () => {
    if (comment === "") return;
    axios
      .get(env.API_URL + "/posts", {})
      .then(async function (responsePosts) {
        let post = await responsePosts.data.dataPosts.find(
          (x) => x._id === idDetailForum
        );
        if (post) {
          axios
            .put(env.API_URL + "/comment-posts", {
              id: idDetailForum,
              comments: [
                ...post.comments,
                {
                  idComment: shortid.generate(),
                  idUser: user._id,
                  content: comment,
                  createTime: moment().format("DD-MM-YYYY HH:mm"),
                  reply: [],
                },
              ],
            })
            .then(function (response) {
              setComment("");
              fetchDataPost();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addReply = ({ idComment }) => {
    if (valueReply[idComment] === "") return;
    axios
      .get(env.API_URL + "/posts", {})
      .then(async function (responsePosts) {
        let post = await responsePosts.data.dataPosts.find(
          (x) => x._id === idDetailForum
        );
        if (post) {
          let comment = post.comments.find((x) => x.idComment === idComment);
          if (comment) {
            axios
              .put(env.API_URL + "/comment-posts", {
                id: idDetailForum,
                comments: post.comments.map((x) =>
                  x.idComment === idComment
                    ? {
                        ...x,
                        reply: [
                          ...x.reply,
                          {
                            idUser: user._id,
                            content: valueReply[idComment],
                            createTime: moment().format("DD-MM-YYYY HH:mm"),
                          },
                        ],
                      }
                    : x
                ),
              })
              .then(function (response) {
                setValueReply({
                  ...valueReply,
                  [idComment]: "",
                });
                fetchDataPost();
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto">
      <div className="bg-clip-border rounded-xl bg-white shadow-md">
        <div className="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          <div className="mx-auto my-10 w-full rounded-xl border px-4 py-6 text-gray-700">
            <div className="mb-5">
              <div className="flex relative items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://www.gravatar.com/avatar/?d=identicon"
                  alt="Default Avatar"
                />
                <p className="ml-4 w-56">
                  <strong className="block text-lg font-medium text-gray-700">
                    {post.nameAuthor}
                  </strong>
                  <span className="truncate text-sm text-gray-400">
                    {post.createTime}
                  </span>
                </p>
              </div>
            </div>
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <div className="flex first-letter:items-center justify-center border rounded mx-auto mt-5">
            <div className="w-full bg-white rounded-lg px-4 pt-2">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white"
                    placeholder="Nhập bình luận..."
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="w-full flex items-start md:w-full px-3">
                  <div
                    className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    onClick={addComment}
                  >
                    Gửi bình luận
                  </div>
                </div>
              </div>
            </div>
          </div>
          {post.comments?.length > 0 &&
            post.comments.map((comment, index) => (
              <div className="mx-auto mt-10 w-full">
                <div className="rounded-md border p-4 bg-white">
                  <div className="flex relative items-center space-x-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://www.gravatar.com/avatar/?d=identicon"
                      alt="Default Avatar"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {comment.nameAuthor}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {comment.createTime}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-800">{comment.content}</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-800"
                      onClick={() => {
                        setCheckInputReply({
                          ...checkInputReply,
                          [comment.idComment]: true,
                        });
                        setTimeout(() => {
                          document.getElementById(comment.idComment)?.focus();
                        }, 500);
                      }}
                    >
                      <div>Trả lời</div>
                    </button>
                  </div>
                </div>
                {comment.reply?.length > 0 &&
                  comment.reply.map((reply, index) => (
                    <>
                      <div className="my-4 ml-10 rounded-md border p-4 bg-white">
                        <div className="flex relative items-center space-x-4">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://www.gravatar.com/avatar/?d=identicon"
                            alt="Default Avatar"
                          />
                          <div>
                            <h3 className="text-md font-medium">
                              {reply.nameAuthor}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {reply.createTime}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-800">{reply.content}</p>
                      </div>
                    </>
                  ))}
                {checkInputReply[comment.idComment] && (
                  <div className="flex first-letter:items-center justify-center border rounded mt-5 my-4 ml-10">
                    <div className="w-full bg-white rounded-lg px-4 pt-2">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea
                            id={comment.idComment}
                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white"
                            placeholder="Nhập câu trả lời..."
                            name="reply"
                            value={valueReply[comment.idComment]}
                            onChange={(e) => {
                              setValueReply({
                                ...valueReply,
                                [comment.idComment]: e.target.value,
                              });
                            }}
                          ></textarea>
                        </div>
                        <div className="w-full flex items-start md:w-full px-3">
                          <div
                            className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                            onClick={() =>
                              addReply({ idComment: comment.idComment })
                            }
                          >
                            Gửi câu trả lời
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
