import React, { useEffect, useState } from "react";
import { Select, Divider, Table } from "antd";
import { Link } from "react-router-dom";

export default function XetKetQuaKyThiDanhGiaNangLuc({
  user,
  maforSchoolProfileAndRatedCapacity,
  scores,
  allMajor,
}) {
  const [dataMajor, setDataMajor] = useState([]);
  const columns = [
    {
      title: <div className="text-center">Ngành</div>,
      key: "major",
      width: "70%",
      render: (item) => {
        return (
          <a
            href={`/majors/${allMajor[item.major]._id}`}
            target="_blank"
            className="text-center"
          >
            {item.major}
          </a>
        );
      },
    },
    {
      title: (
        <div className="text-center">Điểm chuẩn đánh giá năng lực (2023)</div>
      ),
      key: "score_rated_capacity",
      render: (item) => {
        return <div className="text-center">{item.score_rated_capacity}</div>;
      },
    },
  ];

  const [yourScore, setYourScore] = useState(0);

  const fetchScore = () => {
    let currentYourScore =
      Math.max(
        scores.khuVuc === "KV1"
          ? 30
          : scores.khuVuc === "KV2-NT"
          ? 20
          : scores.khuVuc === "KV2"
          ? 10
          : 0,
        scores.doiTuong === "1-4" ? 80 : scores.doiTuong === "5-7" ? 40 : 0
      ) + scores.danhGiaNangLuc;
    setYourScore(currentYourScore.toFixed(2));
    setDataMajor(
      maforSchoolProfileAndRatedCapacity
        .filter((x) => x.score_rated_capacity <= scores.danhGiaNangLuc)
        .sort((a, b) => b.score_rated_capacity - a.score_rated_capacity)
    );
  };
  useEffect(() => {
    fetchScore();
  }, []);
  return (
    <div>
      <div className="text-xl font-bold text-center">
        PHƯƠNG THỨC XÉT KẾT QUẢ THI ĐÁNH GIÁ NĂNG LỰC
      </div>
      <Divider />
      <div>
        Điểm của bạn: <span className="font-bold">{yourScore}</span>
      </div>
      <Table columns={columns} dataSource={dataMajor} pagination={false} />
    </div>
  );
}
