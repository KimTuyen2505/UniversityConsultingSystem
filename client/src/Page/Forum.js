import React, { useEffect, useState } from "react";
import axios from "axios";

import * as env from "../env.js";

export default function Forum() {
  const url = "https://tuyensinh.tdmu.edu.vn/NganhDaoTao/NganhDaoTaoDHChinhQuy";
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
        link: url,
      })
      .then(async function (response) {
        axios
          .get(env.API_URL + "/major", {})
          .then(async function (responseMajor) {
            await response.data.forEach(async (element) => {
              let listMajor = await element.split(",");
              await listMajor.forEach(async (major) => {
                if (
                  major !== "" &&
                  !(await responseMajor.data.dataMajors.find(
                    (x) => x.nameMajor === major
                  ))
                ) {
                  await axios
                    .post(env.API_URL + "/major", {
                      nameMajor: major,
                    })
                    .then(function (response) {})
                    .catch(function (error) {
                      console.log(error);
                    });
                }
              });
            });
            let tmpMajors = await responseMajor.data.dataMajors;
            let newObj = {};
            Object.keys(majors).map((major, index) => {
              let arr = response.data[index].split(",");
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
            console.log(newObj);
            setMajors(newObj);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // const columns = [
  //   {
  //     title: "Tên bài viết",
  //     key: "namePost",
  //   },
  //   {
  //     title: "Thời gian đăng",
  //     dataIndex: "timePost",
  //     key: "timePost",
  //   },
  // ];
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
                    <div className="relative z-10 grid gap-3 grid-cols-6">
                      {majors[major].length > 0 &&
                        majors[major].map((childMajor) => {
                          if (childMajor) {
                            return (
                              <div
                                className="col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                  (window.location.href = `/forum/${childMajor.id}`)
                                }
                              >
                                <div className="size-fit m-auto relative">
                                  <h2 className="text-center font-semibold text-gray-950 text-2xl">
                                    {childMajor.element}
                                  </h2>
                                </div>
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
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
