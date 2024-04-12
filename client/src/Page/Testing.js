import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Divider } from "antd";

import * as env from "../env";

import XetHocBa_HinhThuc1 from "../components/XetHocBa_HinhThuc1";
import XetHocBa_HinhThuc2 from "../components/XetHocBa_HinhThuc2";
import XetKetQuaKyThiTHPT from "../components/XetKetQuaKyThiTHPT.js";
import XetKetQuaKyThiDanhGiaNangLuc from "../components/XetKetQuaKyThiDanhGiaNangLuc.js";

export default function Testing() {
  const user = localStorage.getItem("dataUser")
    ? JSON.parse(localStorage.getItem("dataUser"))
    : null;
  const [allMajor, setAllMajor] = useState({});

  const [majorTHPT, setMajorTHPT] = useState([]);
  const [
    maforSchoolProfileAndRatedCapacity,
    setMajorSchoolProfileAndRatedCapacity,
  ] = useState([]);
  const [scores, setScores] = useState({});
  const fetchMajorTHPT = () => {
    axios
      .post(env.API_URL + "/fetch-score-thpt", {})
      .then((res) => {
        console.log("thpt: ", res.data);
        setMajorTHPT(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchMajorSchoolProfileAndRatedCapacity = () => {
    axios
      .post(env.API_URL + "/fetch-score-school-profile", {})
      .then((res) => {
        console.log("school-profile: ", res.data);
        setMajorSchoolProfileAndRatedCapacity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchScores = () => {
    axios
      .get(env.API_URL + "/score", {})
      .then(async (res) => {
        console.log(
          "scores: ",
          res.data.dataScores.find((x) => x.idUser === user._id)
        );
        setScores(await res.data.dataScores.find((x) => x.idUser === user._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAllMajor = () => {
    axios
      .get(env.API_URL + "/major", {})
      .then(async function (responseMajor) {
        let obj = {};
        await responseMajor.data.dataMajors.forEach((element) => {
          obj[element.nameMajor] = element;
        });
        setAllMajor(obj);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchMajorTHPT();
    fetchMajorSchoolProfileAndRatedCapacity();
    fetchScores();
    fetchAllMajor();
  }, []);
  const [key, setKey] = useState("0");
  const hanldeChange = (value) => {
    setKey(value);
  };
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto min-h-screen">
      <div className="bg-clip-border rounded-xl bg-white shadow-md">
        <div className="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          <Select
            value={key}
            onChange={hanldeChange}
            className="w-full"
            options={[
              {
                value: "0",
                label: "Chọn phương thức xét tuyển",
              },
              {
                value: "1",
                label: "PHƯƠNG THỨC XÉT HỌC BẠ (Hình thức 1)",
              },
              {
                value: "2",
                label: "PHƯƠNG THỨC XÉT HỌC BẠ (Hình thức 2)",
              },
              {
                value: "3",
                label: "PHƯƠNG THỨC XÉT KẾT QUẢ KỲ THI TỐT NGHIỆP THPT",
              },
              {
                value: "4",
                label: "PHƯƠNG THỨC XÉT KẾT QUẢ THI ĐÁNH GIÁ NĂNG LỰC",
              },
            ]}
          />
          <Divider />
          {key === "1" && (
            <XetHocBa_HinhThuc1
              user={user}
              maforSchoolProfileAndRatedCapacity={
                maforSchoolProfileAndRatedCapacity
              }
              scores={scores}
              allMajor={allMajor}
            />
          )}
          {key === "2" && (
            <XetHocBa_HinhThuc2
              user={user}
              maforSchoolProfileAndRatedCapacity={
                maforSchoolProfileAndRatedCapacity
              }
              scores={scores}
              allMajor={allMajor}
            />
          )}
          {key === "3" && (
            <XetKetQuaKyThiTHPT
              user={user}
              majorTHPT={majorTHPT}
              scores={scores}
              allMajor={allMajor}
            />
          )}
          {key === "4" && (
            <XetKetQuaKyThiDanhGiaNangLuc
              user={user}
              maforSchoolProfileAndRatedCapacity={
                maforSchoolProfileAndRatedCapacity
              }
              scores={scores}
              allMajor={allMajor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
