import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Modal, Input, Button, Divider, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import * as env from "../env.js";

export default function Profile({ user }) {
  const { idUser } = useParams();
  const [profile, setProfile] = useState({});
  const fetchProfile = () => {
    axios
      .get(env.API_URL + "/account", {})
      .then(async function (responseAccount) {
        let checkExist = await responseAccount.data.dataAccounts.find(
          (x) => x._id === idUser
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

  const items = [
    {
      label: <div onClick={openModalChangeAvatar}>Thay đổi ảnh đại diện</div>,
      key: "0",
    },
  ];

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
            <div class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Vui lòng chọn tệp hình ảnh hợp lệ (jpg, jpeg, png)
            </div>
          )}
          <Divider />
          <div className="flex justify-center items-center">
            <Button onClick={changeAvatar}>Cập nhật</Button>
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
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottom"
              arrow
            >
              <img
                src={profile.avatar}
                className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 hover:opacity-65 cursor-pointer"
              />
            </Dropdown>
          </div>

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Theo dõi
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Nhắn tin
            </button>
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {`${profile.family_name} ${profile.given_name}`}
          </h1>

          <p className="mt-8 text-gray-500">{profile.description}</p>
        </div>

        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
}
