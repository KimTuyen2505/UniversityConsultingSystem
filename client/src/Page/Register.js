import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";

import * as env from "../env.js";

export default function Register({ user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [givenName, setGivenName] = useState("");

  const [error, setError] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const registerAccount = () => {
    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      familyName === "" ||
      givenName === ""
    ) {
      setError(true);
    } else {
      setError(false);
      axios
        .get(env.API_URL + "/account", {})
        .then(async function (responseAccount) {
          if (
            responseAccount.data.dataAccounts.find(
              (x) => x.username === username
            )
          ) {
            setErrorUsername(true);
            return;
          } else {
            setErrorUsername(false);
            if (password.length < 8) {
              setErrorPassword(true);
              return;
            } else {
              setErrorPassword(false);
              if (password !== confirmPassword) {
                setErrorConfirmPassword(true);
                return;
              } else {
                setErrorConfirmPassword(false);
                axios
                  .post(env.API_URL + "/account", {
                    username: username,
                    password: password,
                    email: "",
                    given_name: givenName,
                    family_name: familyName,
                  })
                  .then(function (response) {
                    window.location.href = "/login";
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" uppercase flex items-center mb-6 text-2xl font-semibold text-gray-900">
          Đăng ký
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errorUsername && (
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    Tài khoản đã được đăng ký
                  </div>
                )}
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errorPassword && (
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    Mật khẩu phải có độ dài ít nhất là 8 ký tự
                  </div>
                )}
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  name="cofirmPassword"
                  id="cofirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorConfirmPassword && (
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    Mật khẩu không khớp
                  </div>
                )}
              </div>
              <div>
                <label
                  for="family_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Họ
                </label>
                <input
                  type="text"
                  name="family_name"
                  id="family_name"
                  placeholder="Họ"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required=""
                  onChange={(e) => setFamilyName(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="given_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên
                </label>
                <input
                  type="text"
                  name="given_name"
                  id="given_name"
                  placeholder="Tên"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required=""
                  onChange={(e) => setGivenName(e.target.value)}
                />
              </div>
              <div className="w-full flex">
                <Button
                  className="justify-center w-full"
                  onClick={registerAccount}
                >
                  Đăng ký
                </Button>
              </div>
              {error && (
                <div className="block mb-2 text-sm font-medium text-red-500">
                  Không được để trống bất kỳ thông tin nào
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
