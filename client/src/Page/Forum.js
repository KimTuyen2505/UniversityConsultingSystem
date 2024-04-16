import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcCollaboration } from "react-icons/fc";

import * as env from "../env.js";
import { Link, useNavigate } from "react-router-dom";

export default function Forum() {
  const navigate = useNavigate();
  const url = "https://tuyensinh.tdmu.edu.vn";
  const [majors, setMajors] = useState({
    "Ngành Sư Phạm": [],
    "Ngành Kinh Tế": [],
    "Ngành Ngoại Ngữ": [],
    "Ngành Công Nghiệp Văn Hóa": [],
    "Ngành Tự Nhiên - Thực Phẩm": [],
    "Ngành Khoa Học Quản Lý": [],
    "Ngành Kỹ Thuật - Công Nghệ": [],
    "Ngành Kiến Trúc - Xây Dựng - Quy Hoạch": [],
    "Ngành Khoa Học Xã Hội Và Nhân Văn": [],
    "Ngành Đào Tạo Bằng Tiếng Anh": [],
    "Ngành Y - Dược": [],
  });
  useEffect(() => {
    axios
      .post(env.API_URL + "/fetch-major", {
        link: url.concat("/NganhDaoTao/NganhDaoTaoDHChinhQuy"),
      })
      .then(async function (response) {
        axios
          .get(env.API_URL + "/major", {})
          .then(async function (responseMajor) {
            await response.data.forEach(async (element) => {
              let listMajor = await element.name.split(",");
              let listHref = await element.detail.split(",");
              await listMajor.forEach(async (major, index) => {
                if (
                  major !== "" &&
                  !(await responseMajor.data.dataMajors.find(
                    (x) => x.nameMajor === major
                  ))
                ) {
                  await axios
                    .post(env.API_URL + "/major", {
                      nameMajor: major,
                      detailMajor: listHref[index],
                    })
                    .then(function (response) {})
                    .catch(function (error) {
                      console.log(error);
                    });
                }
              });
            });
            axios
              .get(env.API_URL + "/major", {})
              .then(async function (responseMajor) {
                let tmpMajors = await responseMajor.data.dataMajors;
                let newObj = {};
                Object.keys(majors).map((major, index) => {
                  let arr = response.data[index].name.split(",");
                  newObj[major] = [];
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i] !== "") {
                      newObj[major].push({
                        element: arr[i],
                        id: tmpMajors.find((x) => x.nameMajor === arr[i])._id,
                      });
                    }
                  }
                });
                // console.log(newObj);
                setMajors(newObj);
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
  }, []);
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto">
      <div className="bg-clip-border rounded-xl bg-white shadow-md">
        <div className="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          {Object.keys(majors).map((major) => (
            <>
              <div className="flex justify-center text-3xl font-bold">
                Diễn Đàn Khối {major}
              </div>
              <div className="py-16">
                <div className="mx-auto px-6 max-w-6xl text-gray-500">
                  <div className="relative">
                    <div className="container flex flex-col items-center gap-16 mx-auto">
                      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {majors[major].length > 0 &&
                          majors[major].map((childMajor) => {
                            if (childMajor) {
                              return (
                                <div
                                  className="flex flex-col items-center gap-3 px-8 py-10 bg-blue-100 rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                  onClick={() =>
                                    navigate(`/forum/${childMajor.id}`)
                                  }
                                >
                                  <FcCollaboration size={50} />
                                  <p className="text-2xl font-extrabold text-dark-grey-900">
                                    {childMajor.element}
                                  </p>
                                </div>
                              );
                            } else {
                              return <div></div>;
                            }
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
