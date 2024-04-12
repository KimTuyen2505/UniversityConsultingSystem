import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import * as env from "../env.js";

export default function ForumOfMajors() {
  const user = localStorage.getItem("dataUser")
    ? JSON.parse(localStorage.getItem("dataUser"))
    : null;
  const { idForum } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = ({ content }) => {
    messageApi.open({
      type: "success",
      content: content,
    });
  };
  const errorMessage = ({ content }) => {
    messageApi.open({
      type: "error",
      content: content,
    });
  };

  const removeTinyLogo = async () => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let logoTiny = document.querySelectorAll("a");
      let check = false;
      logoTiny.forEach((element) => {
        if (
          element.href ===
          "https://www.tiny.cloud/powered-by-tiny?utm_campaign=poweredby&utm_source=tiny&utm_medium=referral&utm_content=v7"
        ) {
          element.remove();
          check = true;
        }
      });
      if (!check) {
        break;
      }
    }
  };

  const [posts, setPosts] = useState([]);

  const fetchDataPosts = async () => {
    axios
      .get(env.API_URL + "/account", {})
      .then(function (responseAccount) {
        axios
          .get(env.API_URL + "/posts", {})
          .then(async function (responsePost) {
            let arr = [];
            await responsePost.data.dataPosts.forEach(async (post) => {
              // console.log(post.idMajor, idForum);
              if (post.idMajor === idForum) {
                let user = await responseAccount.data.dataAccounts.find(
                  (user) => user._id === post.author
                );
                arr.push({
                  ...post,
                  nameAuthor: user.family_name
                    ? user.family_name
                    : "" + " " + user.given_name
                    ? user.given_name
                    : "",
                });
              }
            });
            setPosts(arr.reverse());
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [major, setMajor] = useState("");
  const fetchNameMajor = async () => {
    axios
      .get(env.API_URL + "/major", {})
      .then(async function (responseMajor) {
        let check = await responseMajor.data.dataMajors.find(
          (x) => x._id === idForum
        );
        if (check) {
          setMajor(check.nameMajor);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    removeTinyLogo();
    fetchDataPosts();
    fetchNameMajor();
  }, []);

  const [title, setTitle] = useState("");
  const [contentPost, setContentPost] = useState("");
  const [modal, warningAddPost] = Modal.useModal();
  const resetInput = () => {
    setTitle("");
    setContentPost("");
  };
  const addPost = () => {
    if (!user) {
      errorMessage({ content: "Vui lòng đăng nhập để đăng bài viết" });
      return;
    } else if (title === "" || contentPost === "") {
      errorMessage({ content: "Vui lòng nhập đầy đủ tiêu đề và nội dung" });
      return;
    }
    modal.confirm({
      title: "XÁC NHẬN",
      icon: <ExclamationCircleOutlined />,
      content: "Xác nhận đăng bài viết này",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okType: "danger",
      onOk() {
        axios
          .post(env.API_URL + "/posts", {
            title: title,
            content: contentPost,
            idMajor: idForum,
            author: user._id,
            createTime: moment().format("DD-MM-YYYY HH:mm"),
          })
          .then(function (response) {
            successMessage({ content: "Đăng bài viết thành công" });
            resetInput();
            fetchDataPosts();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });
  };
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto">
      {warningAddPost}
      {contextHolder}
      <div className="bg-clip-border rounded-xl bg-white shadow-md">
        <div className="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          <div className="flex justify-center text-3xl font-bold">
            Diễn Đàn Ngành {major}
          </div>
          <div className="py-16">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                Tiêu đề
              </span>
              <input
                type="text"
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
                placeholder="Nhập tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <Editor
              value={contentPost}
              apiKey="zoepdkew6cxgonoe94fds21y751xtdjwwjcm2243r7uwpv49"
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align lineheight | emoticons charmap",
              }}
              onChange={(e) => {
                setContentPost(e.target.getContent());
              }}
            />
            <div className="flex justify-end mt-5">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={addPost}
              >
                Đăng
              </button>
            </div>
            {posts.length > 0 &&
              posts.map((post, index) => (
                <Link to={`/forum/${idForum}/${post._id}`}>
                  <div className="mx-auto my-10 w-full rounded-xl border px-4 py-6 text-gray-700">
                    <div className="mb-5">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://www.gravatar.com/avatar/?d=identicon"
                          alt="Default Avatar"
                        />
                        <p className="ml-4 w-56">
                          <strong className="block font-medium text-gray-700">
                            {post.nameAuthor}
                          </strong>
                          <span className="truncate text-sm text-gray-400">
                            {post.createTime}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">{post.title}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
