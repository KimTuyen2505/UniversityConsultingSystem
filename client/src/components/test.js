import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Test() {
  const [html, setHtml] = useState("");
  const fetchData = async () => {
    try {
      let res = await axios.get(
        "https://thi.tuyensinh247.com/thong-tin-tuyen-sinh-c15.html"
      );
      console.log(res.data);
      // let $ = await cheerio.load(res.data);
      // $(
      //   "#container > div > div > div.box-left > div.box-cont.clearfix > ul > li"
      // ).each((i, e) => {
      //   const img = $(e).find("li.clearfix > a > img").attr("src");
      //   const tieude = $(e).find("li.clearfix > h3").text().trim();
      //   const date = $(e).find("li.clearfix > p > em").text().trim();
      //   const noidung = $(e).find("li.clearfix > .decription").text().trim();
      //   const ob = {
      //     img: img,
      //     tieude: tieude,
      //     date: date,
      //     noidung: noidung,
      //   };
      //   state.push(ob);
      // });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
