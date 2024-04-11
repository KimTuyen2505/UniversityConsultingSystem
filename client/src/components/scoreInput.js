import React, { useEffect, useState } from "react";
import {
  Divider,
  Table,
  Input,
  Space,
  Select,
  Tabs,
  message,
  Modal,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import * as env from "../env.js";

export default function ScoreInput() {
  const user = localStorage.getItem("dataUser")
    ? JSON.parse(localStorage.getItem("dataUser"))
    : null;
  const [idScores, setIdScores] = useState("");
  const [HK1Lop11, setHK1Lop11] = useState({
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
  });
  const [HK2Lop11, setHK2Lop11] = useState({
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
  });
  const [HK1Lop12, setHK1Lop12] = useState({
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
  });
  const [nangKhieu, setNangKhieu] = useState(0);
  const [khuVuc, setKhuVuc] = useState("");
  const [doiTuong, setDoiTuong] = useState("");
  const [tongLop12, setTongLop12] = useState({
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
  });
  const [danhGiaNangLuc, setDanhGiaNangLuc] = useState(0);
  const [kyThiTHPT, setKyThiTHPT] = useState({
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
  });
  const fetchScores = () => {
    axios
      .get(env.API_URL + "/score", {})
      .then(async function (response) {
        let score = await response.data.dataScores.find(
          (x) => x.idUser === user._id
        );
        setIdScores(score._id);
        setHK1Lop11(score.HK1Lop11);
        setHK2Lop11(score.HK2Lop11);
        setHK1Lop12(score.HK1Lop12);
        setNangKhieu(score.nangKhieu);
        setKhuVuc(score.khuVuc);
        setDoiTuong(score.doiTuong);
        setTongLop12(score.tongLop12);
        setDanhGiaNangLuc(score.danhGiaNangLuc);
        setKyThiTHPT(score.kyThiTHPT);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchScores();
  }, []);
  const columnsHK1Lop11 = [
    {
      title: "Toán",
      key: "toan",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, toan: Number(e.target.value) })
            }
            value={item.toan}
          />
        );
      },
    },
    {
      title: "Lý",
      key: "ly",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.ly}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, ly: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Hóa",
      key: "hoa",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.hoa}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, hoa: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sinh",
      key: "sinh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.sinh}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, sinh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Văn",
      key: "van",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.van}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, van: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sử",
      key: "su",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.su}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, su: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Địa",
      key: "dia",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.dia}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, dia: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Công dân",
      key: "gdcd",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.gdcd}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, gdcd: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Anh",
      key: "anh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.anh}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, anh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Trung",
      key: "trung",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.trung}
            onChange={(e) =>
              setHK1Lop11({ ...HK1Lop11, trung: Number(e.target.value) })
            }
          />
        );
      },
    },
  ];
  const columnsHK2Lop11 = [
    {
      title: "Toán",
      key: "toan",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, toan: Number(e.target.value) })
            }
            value={item.toan}
          />
        );
      },
    },
    {
      title: "Lý",
      key: "ly",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.ly}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, ly: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Hóa",
      key: "hoa",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.hoa}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, hoa: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sinh",
      key: "sinh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.sinh}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, sinh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Văn",
      key: "van",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.van}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, van: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sử",
      key: "su",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.su}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, su: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Địa",
      key: "dia",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.dia}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, dia: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Công dân",
      key: "gdcd",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.gdcd}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, gdcd: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Anh",
      key: "anh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.anh}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, anh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Trung",
      key: "trung",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.trung}
            onChange={(e) =>
              setHK2Lop11({ ...HK2Lop11, trung: Number(e.target.value) })
            }
          />
        );
      },
    },
  ];
  const columnsHK1Lop12 = [
    {
      title: "Toán",
      key: "toan",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, toan: Number(e.target.value) })
            }
            value={item.toan}
          />
        );
      },
    },
    {
      title: "Lý",
      key: "ly",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.ly}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, ly: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Hóa",
      key: "hoa",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.hoa}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, hoa: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sinh",
      key: "sinh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.sinh}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, sinh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Văn",
      key: "van",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.van}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, van: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sử",
      key: "su",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.su}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, su: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Địa",
      key: "dia",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.dia}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, dia: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Công dân",
      key: "gdcd",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.gdcd}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, gdcd: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Anh",
      key: "anh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.anh}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, anh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Trung",
      key: "trung",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.trung}
            onChange={(e) =>
              setHK1Lop12({ ...HK1Lop12, trung: Number(e.target.value) })
            }
          />
        );
      },
    },
  ];
  const columnsTongLop12 = [
    {
      title: "Toán",
      key: "toan",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) =>
              setTongLop12({ ...tongLop12, toan: Number(e.target.value) })
            }
            value={item.toan}
          />
        );
      },
    },
    {
      title: "Lý",
      key: "ly",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.ly}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, ly: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Hóa",
      key: "hoa",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.hoa}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, hoa: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sinh",
      key: "sinh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.sinh}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, sinh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Văn",
      key: "van",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.van}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, van: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Sử",
      key: "su",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.su}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, su: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Địa",
      key: "dia",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.dia}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, dia: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Công dân",
      key: "gdcd",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.gdcd}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, gdcd: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Anh",
      key: "anh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.anh}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, anh: Number(e.target.value) })
            }
          />
        );
      },
    },
    {
      title: "Tiếng Trung",
      key: "trung",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.trung}
            onChange={(e) =>
              setTongLop12({ ...tongLop12, trung: Number(e.target.value) })
            }
          />
        );
      },
    },
  ];
  const columnsTuNhien = [
    {
      title: "Toán",
      key: "toan",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.tunhien.toan = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
            value={item.toan}
          />
        );
      },
    },
    {
      title: "Lý",
      key: "ly",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.ly}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.tunhien.ly = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
    {
      title: "Hóa",
      key: "hoa",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.hoa}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.tunhien.hoa = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
    {
      title: "Sinh",
      key: "sinh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.sinh}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.tunhien.sinh = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
    {
      title: "Văn",
      key: "van",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.van}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.tunhien.van = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
    {
      title: "Tiếng Anh",
      key: "anh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.anh}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.tunhien.anh = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
  ];
  const columnsXaHoi = [
    {
      title: "Toán",
      key: "toan",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.xahoi.toan = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
            value={item.toan}
          />
        );
      },
    },
    {
      title: "Sử",
      key: "su",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.xahoi.su = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
            value={item.su}
          />
        );
      },
    },
    {
      title: "Địa",
      key: "dia",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.xahoi.dia = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
            value={item.dia}
          />
        );
      },
    },
    {
      title: "Công dân",
      key: "gdcd",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.xahoi.gdcd = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
            value={item.gdcd}
          />
        );
      },
    },
    {
      title: "Văn",
      key: "van",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.van}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.xahoi.van = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
    {
      title: "Tiếng Anh",
      key: "anh",
      align: "center",
      render: (item) => {
        return (
          <Input
            type="number"
            min="0"
            max="10"
            value={item.anh}
            onChange={(e) => {
              let temp = { ...kyThiTHPT };
              temp.xahoi.anh = Number(e.target.value);
              setKyThiTHPT(temp);
            }}
          />
        );
      },
    },
  ];

  const items = [
    {
      label: "Phương thức tuyển sinh 1",
      key: "1",
      children: (
        <div className="text-2xl font-bold uppercase">
          Phương thức xét học bạ (Điểm trung bình chung 3 học kỳ (HK1, HK2 lớp
          11 và HK1 lớp 12))
          <Divider />
          <div className="text-xl font-normal">HK1 Lớp 11</div>
          <Table
            columns={columnsHK1Lop11}
            dataSource={[HK1Lop11]}
            pagination={false}
            className="font-normal"
          />
          <Divider />
          <div className="text-xl font-normal">HK2 Lớp 11</div>
          <Table
            columns={columnsHK2Lop11}
            dataSource={[HK2Lop11]}
            pagination={false}
            className="font-normal"
          />
          <Divider />
          <div className="text-xl font-normal">HK1 Lớp 12</div>
          <Table
            columns={columnsHK1Lop12}
            dataSource={[HK1Lop12]}
            pagination={false}
            className="font-normal"
          />
        </div>
      ),
    },
    {
      label: "Phương thức tuyển sinh 2",
      key: "2",
      children: (
        <div className="text-2xl font-bold uppercase">
          Phương thức xét học bạ (Điểm trung bình môn lớp 12)
          <Divider />
          <div className="text-xl font-normal">Tổng Lớp 12</div>
          <Table
            columns={columnsTongLop12}
            dataSource={[tongLop12]}
            pagination={false}
            className="font-normal"
          />
        </div>
      ),
    },
    {
      label: "Phương thức tuyển sinh 3",
      key: "3",
      children: (
        <div className="text-2xl font-bold uppercase">
          Phương thức xét kết quả kỳ thi tốt nghiệp THPT
          <Divider />
          <div className="text-xl font-normal">Khối tự nhiên</div>
          <Table
            columns={columnsTuNhien}
            dataSource={[kyThiTHPT.tunhien]}
            pagination={false}
            className="font-normal"
          />
          <Divider />
          <div className="text-xl font-normal">Khối xã hội</div>
          <Table
            columns={columnsXaHoi}
            dataSource={[kyThiTHPT.xahoi]}
            pagination={false}
            className="font-normal"
          />
        </div>
      ),
    },
    {
      label: "Phương thức tuyển sinh 4",
      key: "4",
      children: (
        <div className="text-2xl font-bold uppercase">
          Phương thức xét kết quả thi đánh giá năng lực
          <Divider />
          <Space className="font-bold uppercase">
            <div className="text-xl">Điểm đánh giá năng lực: </div>
            <Input
              type="number"
              min="0"
              max="10"
              className="font-normal"
              value={danhGiaNangLuc}
              onChange={(e) => setDanhGiaNangLuc(Number(e.target.value))}
            />
          </Space>
        </div>
      ),
    },
  ];
  const [modal, contextHolder] = Modal.useModal();
  const updateScores = () => {
    modal.confirm({
      title: "XÁC NHẬN",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn cập nhật?",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        axios
          .put(env.API_URL + "/score", {
            id: idScores,
            HK1Lop11: HK1Lop11,
            HK2Lop11: HK2Lop11,
            HK1Lop12: HK1Lop12,
            nangKhieu: nangKhieu,
            khuVuc: khuVuc,
            doiTuong: doiTuong,
            tongLop12: tongLop12,
            danhGiaNangLuc: danhGiaNangLuc,
            kyThiTHPT: kyThiTHPT,
          })
          .then(function (response) {
            message.success("Cập nhật điểm thành công");
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });
  };

  return (
    <div className="w-full">
      {contextHolder}
      <Space className="text-2xl font-bold uppercase">
        <div>Môn năng khiếu: </div>
        <Input
          type="number"
          min="0"
          max="10"
          className="font-normal"
          value={nangKhieu}
          onChange={(e) => setNangKhieu(Number(e.target.value))}
        />
      </Space>
      <Divider />
      <Space className="text-2xl font-bold uppercase">
        <div>Chọn khu vực: </div>
        <Select
          className="font-normal"
          style={{
            width: 200,
          }}
          value={khuVuc}
          onChange={(value) => setKhuVuc(value)}
          options={[
            {
              value: "",
              label: "",
            },
            {
              value: "KV1",
              label: "KV1",
            },
            {
              value: "KV2-NT",
              label: "KV2-NT",
            },
            {
              value: "KV2",
              label: "KV2",
            },
          ]}
        />
      </Space>
      <Divider />
      <Space className="text-2xl font-bold uppercase">
        <div>Đối tượng ưu tiên: </div>
        <Select
          className="font-normal"
          style={{
            width: 200,
          }}
          value={doiTuong}
          onChange={(value) => setDoiTuong(value)}
          options={[
            {
              value: "",
              label: "",
            },
            {
              value: "1-4",
              label: "1-4",
            },
            {
              value: "5-7",
              label: "5-7",
            },
          ]}
        />
      </Space>
      <Divider />
      <Tabs defaultActiveKey="1" type="card" items={items} />
      <Divider />
      <div className="flex justify-center">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          onClick={updateScores}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}
