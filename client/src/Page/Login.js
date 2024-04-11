import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import * as env from "../env.js";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [textError, setTextError] = useState(false);
  const loginAccount = () => {
    if (username === "" || password === "") {
      setError(true);
      setTextError("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }
    axios
      .get(env.API_URL + "/account", {})
      .then(async function (responseAccount) {
        let account = await responseAccount.data.dataAccounts.find(
          (x) => x.username === username && x.password === password
        );
        if (account) {
          setError(false);
          localStorage.setItem("dataUser", JSON.stringify(account));
          setUser(account);
          window.location.href = "/";
        } else {
          setError(true);
          setTextError("Tài khoản hoặc mật khẩu không đúng");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      {!user && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className=" uppercase flex items-center mb-6 text-2xl font-semibold text-gray-900">
            Đăng nhập
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        loginAccount();
                      }
                    }}
                  />
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        loginAccount();
                      }
                    }}
                  />
                </div>
                <div className="w-full flex">
                  <Button
                    className="justify-center w-full"
                    onClick={loginAccount}
                  >
                    Đăng nhập
                  </Button>
                </div>
                {error && (
                  <div className="block mb-2 text-sm font-medium text-red-500">
                    {textError}
                  </div>
                )}
                <p className="text-sm font-light text-gray-500">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </form>
              <div className="flex justify-center items-center">
                <GoogleOAuthProvider clientId="880803946280-p1b8b2hbn28hpj7mr6bbf3olbvfc5pri.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      setUser(decoded);
                      axios
                        .get(env.API_URL + "/account", {})
                        .then(function (responseAccount) {
                          let account = responseAccount.data.dataAccounts.find(
                            (x) => x.email === decoded.email
                          );
                          if (!account) {
                            axios
                              .post(env.API_URL + "/account", {
                                username: "",
                                password: "",
                                email: decoded.email,
                                given_name: decoded.given_name,
                                family_name: decoded.family_name,
                              })
                              .then(function (response) {
                                axios
                                  .post(env.API_URL + "/score", {
                                    idUser: response.data.data._id,
                                    HK1Lop11: {
                                      toan: 0,
                                      ly: 0,
                                      hoa: 0,
                                      sinh: 0,
                                      van: 0,
                                      su: 0,
                                      dia: 0,
                                      gdcd: 0,
                                      anh: 0,
                                      trung: 0,
                                    },
                                    HK2Lop11: {
                                      toan: 0,
                                      ly: 0,
                                      hoa: 0,
                                      sinh: 0,
                                      van: 0,
                                      su: 0,
                                      dia: 0,
                                      gdcd: 0,
                                      anh: 0,
                                      trung: 0,
                                    },
                                    HK1Lop12: {
                                      toan: 0,
                                      ly: 0,
                                      hoa: 0,
                                      sinh: 0,
                                      van: 0,
                                      su: 0,
                                      dia: 0,
                                      gdcd: 0,
                                      anh: 0,
                                      trung: 0,
                                    },
                                    nangKhieu: 0,
                                    khuVuc: "",
                                    doiTuong: "",
                                    tongLop12: {
                                      toan: 0,
                                      ly: 0,
                                      hoa: 0,
                                      sinh: 0,
                                      van: 0,
                                      su: 0,
                                      dia: 0,
                                      gdcd: 0,
                                      anh: 0,
                                      trung: 0,
                                    },
                                    danhGiaNangLuc: 0,
                                    kyThiTHPT: {
                                      tunhien: {
                                        toan: 0,
                                        ly: 0,
                                        hoa: 0,
                                        sinh: 0,
                                        van: 0,
                                        anh: 0,
                                      },
                                      xahoi: {
                                        toan: 0,
                                        su: 0,
                                        dia: 0,
                                        gdcd: 0,
                                        van: 0,
                                        anh: 0,
                                      },
                                    },
                                  })
                                  .then(async function (response) {
                                    localStorage.setItem(
                                      "dataUser",
                                      JSON.stringify({
                                        ...decoded,
                                        _id: await response.data.dataAccounts.find(
                                          (x) => x.email === decoded.email
                                        )._id,
                                      })
                                    );
                                    window.location.href = "/";
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                  });
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          } else {
                            localStorage.setItem(
                              "dataUser",
                              JSON.stringify({ ...decoded, _id: account._id })
                            );
                            window.location.href = "/";
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    }}
                    onError={(result) => {
                      alert(result.error);
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
