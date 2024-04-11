import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Modal, Input, Button, Divider, message, Space } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";

import * as env from "../env.js";

import ScoreInput from "../components/scoreInput.js";

export default function Profile({ user }) {
  const { idUser } = useParams();
  const [allUser, setAllUser] = useState([]);
  const [listChat, setListChat] = useState([]);
  const [profile, setProfile] = useState({});
  const [key, setKey] = useState("info");
  const fetchProfile = () => {
    axios
      .get(env.API_URL + "/account", {})
      .then(async function (responseAccount) {
        let checkExist = await responseAccount.data.dataAccounts.find(
          (x) => x._id === idUser
        );
        if (user._id === idUser) {
          localStorage.setItem("dataUser", JSON.stringify(checkExist));
        }
        setAllUser(responseAccount.data.dataAccounts);
        setListChat(
          responseAccount.data.dataAccounts.filter((x) =>
            x.followers.includes(user._id)
          )
        );
        setProfile(checkExist);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const [modal, warning] = Modal.useModal();

  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const openModalChangeAvatar = () => {
    setModalChangeAvatar(true);
  };
  const cancelModalChangeAvatar = () => {
    setAvatar("");
    setUploadImageError(false);
    setModalChangeAvatar(false);
  };
  const [modalChangeName, setModalChangeName] = useState(false);
  const openModalChangeName = () => {
    setFamily_name(profile.family_name ? profile.family_name : "");
    setGiven_name(profile.given_name ? profile.given_name : "");
    setModalChangeName(true);
  };
  const cancelModalChangeName = () => {
    setFamily_name("");
    setGiven_name("");
    setModalChangeName(false);
  };

  const [family_name, setFamily_name] = useState("");
  const [given_name, setGiven_name] = useState("");

  const imagebase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };
  const [avatar, setAvatar] = useState("");
  const [uploadImageError, setUploadImageError] = useState(false);
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setUploadImageError(false);
      const img = await imagebase64(file);
      setAvatar(img);
    } else {
      setUploadImageError(true);
    }
  };

  const changeAvatar = () => {
    if (avatar === "") {
      return;
    }
    modal.confirm({
      title: "XÁC NHẬN",
      icon: <ExclamationCircleOutlined />,
      content: "Xác nhận cập nhật ảnh đại diện",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        axios
          .put(env.API_URL + "/update-avatar-account", {
            id: profile._id,
            avatar: avatar,
          })
          .then(function (response) {
            message.success("Cập nhật ảnh đại diện thành công!!!");
            cancelModalChangeAvatar();
            fetchProfile();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });
  };
  const changeName = () => {
    if (given_name === "") {
      message.error("Vui lòng nhập tên");
      return;
    }
    modal.confirm({
      title: "XÁC NHẬN",
      icon: <ExclamationCircleOutlined />,
      content: "Xác nhận cập nhật tên mới",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        axios
          .put(env.API_URL + "/update-name-account", {
            id: profile._id,
            family_name: family_name,
            given_name: given_name,
          })
          .then(async function (response) {
            message.success("Cập nhật tên mới thành công!!!");
            cancelModalChangeName();
            fetchProfile();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });
  };

  const addFollower = () => {
    axios
      .put(env.API_URL + "/update-followers-account", {
        id: idUser,
        followers: [...profile.followers, user._id],
      })
      .then(function (response) {
        console.log(-1);
        fetchProfile();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const unFollower = () => {
    axios
      .put(env.API_URL + "/update-followers-account", {
        id: idUser,
        followers: profile.followers.filter((x) => x !== user._id),
      })
      .then(function (response) {
        fetchProfile();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchMessages = () => {
    axios
      .get(env.API_URL + "/chat", {})
      .then(async function (response) {
        let chats = await response.data.dataChats.find(
          (x) =>
            (x.idUserA === user._id && x.idUserB === idOther) ||
            (x.idUserA === idOther && x.idUserB === user._id)
        )?.messages;
        if (chats) {
          setMessages(chats);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [checkSend, setCheckSend] = useState(false);
  const [idOther, setIdOther] = useState("");
  const [Message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    axios
      .get(env.API_URL + "/chat", {})
      .then(async function (responseChat) {
        let checkExist = await responseChat.data.dataChats.find(
          (x) =>
            (x.idUserA === user._id && x.idUserB === idOther) ||
            (x.idUserA === idOther && x.idUserB === user._id)
        );
        if (!checkExist) {
          await axios
            .post(env.API_URL + "/chat", {
              idUserA: user._id,
              idUserB: idOther,
            })
            .then(function (response) {})
            .catch(function (error) {
              console.log(error);
            });
        }
        axios
          .get(env.API_URL + "/chat", {})
          .then(async function (response) {
            let checkExist = await response.data.dataChats.find(
              (x) =>
                (x.idUserA === user._id && x.idUserB === idOther) ||
                (x.idUserA === idOther && x.idUserB === user._id)
            );
            axios
              .put(env.API_URL + "/chat", {
                id: checkExist._id,
                messages: [
                  ...checkExist.messages,
                  {
                    idUser: user._id,
                    content: Message,
                  },
                ],
              })
              .then(function (response) {
                fetchMessages();
                setMessage("");
              })
              .catch(function (error) {
                console.log(error);
              });
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
    fetchMessages();
  }, [idOther]);

  return (
    <div className="p-16 z-50 relative">
      {warning}
      <Modal
        title="Thay đổi ảnh đại diện"
        open={modalChangeAvatar}
        onCancel={cancelModalChangeAvatar}
        footer={null}
      >
        <div>
          <Input type="file" onChange={handleUploadImage} value="" />
          {avatar !== "" && <img src={avatar} className="mt-5" alt="" />}
          {uploadImageError && (
            <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Vui lòng chọn tệp hình ảnh hợp lệ (jpg, jpeg, png)
            </div>
          )}
          <Divider />
          <div className="flex justify-center items-center">
            <Button onClick={changeAvatar}>Cập nhật</Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Thay đổi tên"
        open={modalChangeName}
        onCancel={cancelModalChangeName}
        footer={null}
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Họ:
          </label>
          <Input
            defaultValue={profile.family_name ? profile.family_name : ""}
            value={family_name}
            onChange={(e) => setFamily_name(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tên:
          </label>
          <Input
            defaultValue={profile.given_name ? profile.given_name : ""}
            value={given_name}
            onChange={(e) => setGiven_name(e.target.value)}
          />
          <Divider />
          <div className="flex justify-center items-center">
            <Button onClick={changeName}>Cập nhật</Button>
          </div>
        </div>
      </Modal>
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {profile?.followers?.length}
              </p>
              <p className="text-gray-400">Người theo dõi</p>
            </div>
          </div>
          <div className="relative">
            <img
              alt=""
              src={profile?.avatar}
              className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 hover:opacity-65 cursor-pointer"
              onClick={openModalChangeAvatar}
            />
          </div>

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            {idUser !== user._id &&
              !profile?.followers?.find((x) => x === user._id) && (
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={addFollower}
                >
                  Theo dõi
                </button>
              )}
            {idUser !== user._id &&
              profile?.followers?.find((x) => x === user._id) && (
                <button
                  className="py-2 px-4 uppercase rounded bg-gray-400 hover:bg-gray-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={unFollower}
                >
                  Bỏ theo dõi
                </button>
              )}
            {idUser === user._id && key === "info" && (
              <button
                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={() => setKey("chat")}
              >
                Nhắn tin
              </button>
            )}
            {idUser === user._id && key === "chat" && (
              <button
                className="text-white py-2 px-4 uppercase rounded bg-gray-500 hover:bg-gray-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={() => setKey("info")}
              >
                Tắt nhắn tin
              </button>
            )}
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12 relative">
          <Space>
            <h1 className="text-4xl font-medium text-gray-700">
              {`${profile.family_name ? profile.family_name : ""} ${
                profile.given_name ? profile.given_name : ""
              }`}
            </h1>
            {idUser === user._id && user.email === "" && (
              <EditOutlined
                className="text-2xl font-medium text-gray-700 hover:text-gray-500 cursor-pointer"
                onClick={openModalChangeName}
              />
            )}
          </Space>
          <p className="mt-8 text-gray-500">{profile?.description}</p>
        </div>

        <div className="mt-12 flex flex-col justify-center">
          {key === "chat" && (
            <div className="flex h-screen antialiased text-gray-800">
              <div className="flex flex-row h-full w-full">
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                  <div className="flex flex-col">
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-screen overflow-y-auto">
                      {listChat?.map((item) => (
                        <button
                          className="flex flex-row items-center hover:bg-gray-100 rounded-full p-2"
                          onClick={() => {
                            setIdOther(item._id);
                            setCheckSend(true);
                          }}
                        >
                          <div className="flex items-center justify-center bg-indigo-200 rounded-full">
                            <img
                              src={item.avatar}
                              alt=""
                              className="h-8 w-8 rounded-full"
                            />
                          </div>
                          <div className="ml-2 text-sm font-semibold">
                            {`${item.family_name ? item.family_name : ""} ${
                              item.given_name
                            }`}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-auto h-full p-6">
                  <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                      <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                          {messages?.map((item) => {
                            if (item.idUser === user._id) {
                              return (
                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                  <div className="flex items-center justify-start flex-row-reverse">
                                    <div className="flex items-center justify-center rounded-full bg-indigo-500">
                                      <img
                                        src={
                                          allUser.find(
                                            (x) => x._id === item.idUser
                                          ).avatar
                                        }
                                        alt=""
                                        className="h-10 w-10 rounded-full"
                                      />
                                    </div>
                                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                      <div>{item.content}</div>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                  <div className="flex flex-row items-center">
                                    <div className="flex items-center justify-center rounded-full bg-indigo-500">
                                      <img
                                        src={
                                          allUser.find(
                                            (x) => x._id === item.idUser
                                          ).avatar
                                        }
                                        alt=""
                                        className="h-10 w-10 rounded-full"
                                      />
                                    </div>
                                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                      <div>{item.content}</div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                      <div className="flex-grow ml-4">
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            onChange={(e) => setMessage(e.target.value)}
                            value={Message}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && checkSend) {
                                sendMessage();
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        {checkSend && (
                          <button
                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            onClick={sendMessage}
                          >
                            <span>Gửi</span>
                            <span className="ml-2">
                              <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {key === "info" && <ScoreInput />}
        </div>
      </div>
    </div>
  );
}
