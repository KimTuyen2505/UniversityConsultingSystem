import React, { useState } from "react";
import axios from "axios";

import * as env from "../env.js";

function Test() {
  const [data, setData] = useState("");

  const addData = () => {
    axios
      .post(env.API_URL + "/demo", {
        data: data,
      })
      .then(function (response) {
        console.log("success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getAllData = () => {
    axios
      .get(env.API_URL + "/demo", {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateData = () => {
    let newData = "1";
    axios
      .put(env.API_URL + "/update-demo", {
        id: "6597815f81b7f3401114ed2a",
        data: newData,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteData = () => {
    axios
      .put(env.API_URL + "/delete-demo", {
        id: "6597815f81b7f3401114ed2a",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <input type="text" onChange={(e) => setData(e.target.value)} />
      <button onClick={addData}>add</button>
      <button onClick={getAllData}>get all</button>
      <button onClick={updateData}>update</button>
      <button onClick={deleteData}>Delete</button>
    </div>
  );
}

export default Test;
