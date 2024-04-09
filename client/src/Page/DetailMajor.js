import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import * as env from "../env.js";

export default function DetailMajor() {
  const { idMajor } = useParams();
  const url = "https://tuyensinh.tdmu.edu.vn";
  const [listImage, setListImage] = useState([]);
  useEffect(() => {
    axios
      .get(env.API_URL + "/major", {})
      .then(async function (responseMajor) {
        let major = await responseMajor.data.dataMajors.find(
          (x) => x._id === idMajor
        );
        if (major) {
          axios
            .post(env.API_URL + "/fetch-detail-major", {
              link: url.concat(major.detailMajor),
            })
            .then(function (response) {
              console.log(response.data);
              setListImage(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="relative z-50 pt-5 mt-2 mb-2 w-4/5 m-auto">
      <div className="bg-clip-border rounded-xl bg-white shadow-md">
        <div className="bg-clip-border rounded-xl bg-transparent shadow-none m-0 p-6">
          {listImage.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}
