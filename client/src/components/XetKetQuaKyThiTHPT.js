import React, { useState } from "react";
import { Select, Divider, Table } from "antd";
import { Link } from "react-router-dom";

export default function XetKetQuaKyThiTHPT({
  user,
  majorTHPT,
  scores,
  allMajor,
}) {
  // console.log(allMajor);
  const [choiceMajor, setChoiceMajor] = useState("");
  const majors = [
    {
      value: "toan,ly,hoa",
      label: "A00: Toán, Lý, Hóa",
    },
    {
      value: "toan,ly,anh",
      label: "A01: Toán, Lý, Anh",
    },
    {
      value: "toan,ly,sinh",
      label: "A02: Toán, Lý, Sinh",
    },
    {
      value: "toan,van,khtn",
      label: "A16: Toán, Văn, Khoa học Tự nhiên",
    },
    {
      value: "toan,hoa,sinh",
      label: "B00: Toán, Hóa, Sinh",
    },
    {
      value: "toan,sinh,anh",
      label: "B08: Toán, Sinh, Anh",
    },
    {
      value: "van,su,dia",
      label: "C00: Văn, Sử, Địa",
    },
    {
      value: "van,toan,ly",
      label: "C01: Văn, Toán, Vật lý",
    },
    {
      value: "van,toan,gdcd",
      label: "C14: Văn, Toán, Giáo dục công dân",
    },
    {
      value: "van,toan,khxh",
      label: "C15: Văn, Toán, Khoa học xã hội",
    },
    {
      value: "van,su,gdcd",
      label: "C19: Văn, Sử, Giáo dục công dân",
    },
    {
      value: "van,toan,anh",
      label: "D01: Văn, Toán, Anh",
    },
    {
      label: "D04: Văn, Toán, Trung",
      value: "van,toan,trung",
    },
    {
      label: "D07: Toán, Hóa, Anh",
      value: "toan,hoa,anh",
    },
    {
      label: "D09: Toán, Sử, Anh",
      value: "toan,su,anh",
    },
    {
      label: "D14: Văn, Sử, Anh",
      value: "van,su,anh",
    },
    {
      label: "D15: Văn, Địa, Anh",
      value: "van,dia,anh",
    },
    {
      label: "D78: Văn, Anh, Khoa học xã hội",
      value: "van,anh,khxh",
    },
    {
      label: "D90: Toán, Anh, Khoa học tự nhiên",
      value: "toan,anh,khtn",
    },
    {
      label: "M00: Văn, Toán, Năng khiếu",
      value: "van,toan,nk",
    },
    {
      label: "M03: Văn, Khoa học xã hội, Năng khiếu",
      value: "van,khxh,nk",
    },
    {
      label: "M05: Văn, Sử, Năng khiếu",
      value: "van,su,nk",
    },
    {
      label: "M07: Văn, Địa, Năng khiếu",
      value: "van,dia,nk",
    },
    {
      label: "M10: Toán, Anh, Năng khiếu",
      value: "toan,anh,nk",
    },
    {
      label: "M11: Văn, Anh, Năng khiếu",
      value: "van,anh,nk",
    },
    {
      label: "V00: Toán, Lý, Năng khiếu",
      value: "toan,ly,nk",
    },
    {
      label: "V01: Toán, Văn, Năng khiếu",
      value: "toan,van,nk",
    },
  ];
  console.log(allMajor);
  const [dataMajor, setDataMajor] = useState([]);
  const columns = [
    {
      title: <div className="text-center">Ngành</div>,
      key: "major",
      width: "70%",
      render: (item) => {
        return (
          <Link
            to={`/majors/${allMajor[item.major]._id}`}
            className="text-center"
          >
            {item.major}
          </Link>
        );
      },
    },
    {
      title: <div className="text-center">Điểm chuẩn (2023)</div>,
      key: "score",
      render: (item) => {
        return <div className="text-center">{item.score}</div>;
      },
    },
  ];

  const [yourScore, setYourScore] = useState(0);

  const handleChange = (value) => {
    setChoiceMajor(value);
    let major = value.split(",");
    let currentYourScore = Math.max(
      scores.khuVuc === "KV1"
        ? 0.75
        : scores.khuVuc === "KV2-NT"
        ? 0.5
        : scores.khuVuc === "KV2"
        ? 0.25
        : 0,
      scores.doiTuong === "1-4" ? 2 : scores.doiTuong === "5-7" ? 1 : 0
    );
    // console.log("choice: ", major, scores);
    for (let i = 0; i < 3; i++) {
      if (major[i] === "nk") {
        currentYourScore += scores["nangkhieu"];
      } else if (major[i] === "khtn") {
        currentYourScore +=
          (scores.kyThiTHPT.tunhien["ly"] +
            scores.kyThiTHPT.tunhien["hoa"] +
            scores.kyThiTHPT.tunhien["sinh"]) /
          3;
      } else if (major[i] === "khxh") {
        currentYourScore +=
          (scores.kyThiTHPT.xahoi["su"] +
            scores.kyThiTHPT.xahoi["dia"] +
            scores.kyThiTHPT.xahoi["gdcd"]) /
          3;
      } else {
        currentYourScore += scores.kyThiTHPT.tunhien[major[i]]
          ? scores.kyThiTHPT.tunhien[major[i]]
          : scores.kyThiTHPT.xahoi[major[i]];
      }
    }
    setYourScore(currentYourScore.toFixed(2));
    setDataMajor(
      majorTHPT
        .filter(
          (x) =>
            x.score <= currentYourScore &&
            allMajor[x.major] &&
            allMajor[x.major].subjectCombination.includes(value)
        )
        .sort((a, b) => b.score - a.score)
    );
  };
  return (
    <div>
      <div className="text-xl font-bold text-center">
        PHƯƠNG THỨC XÉT KẾT QUẢ KỲ THI TỐT NGHIỆP THPT THEO TỔ HỢP MÔN
      </div>
      <Divider />
      <div>Chọn tổ hợp môn học:</div>
      <Select
        value={choiceMajor}
        onChange={handleChange}
        className="w-full"
        options={majors}
      />
      <Divider />
      <div>
        Điểm của bạn: <span className="font-bold">{yourScore}</span>
      </div>
      <Table columns={columns} dataSource={dataMajor} pagination={false} />
    </div>
  );
}
