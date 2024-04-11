const mongoose = require("mongoose");
const scoresSchema = new mongoose.Schema({
  idUser: {
    type: String,
  },
  HK1Lop11: {
    type: {
      toan: {
        type: Number,
        default: 0,
      },
      ly: {
        type: Number,
        default: 0,
      },
      hoa: {
        type: Number,
        default: 0,
      },
      sinh: {
        type: Number,
        default: 0,
      },
      van: {
        type: Number,
        default: 0,
      },
      su: {
        type: Number,
        default: 0,
      },
      dia: {
        type: Number,
        default: 0,
      },
      gdcd: {
        type: Number,
        default: 0,
      },
      anh: {
        type: Number,
        default: 0,
      },
      trung: {
        type: Number,
        default: 0,
      },
    },
  },
  HK2Lop11: {
    type: {
      toan: {
        type: Number,
        default: 0,
      },
      ly: {
        type: Number,
        default: 0,
      },
      hoa: {
        type: Number,
        default: 0,
      },
      sinh: {
        type: Number,
        default: 0,
      },
      van: {
        type: Number,
        default: 0,
      },
      su: {
        type: Number,
        default: 0,
      },
      dia: {
        type: Number,
        default: 0,
      },
      gdcd: {
        type: Number,
        default: 0,
      },
      anh: {
        type: Number,
        default: 0,
      },
      trung: {
        type: Number,
        default: 0,
      },
    },
  },
  HK1Lop12: {
    type: {
      toan: {
        type: Number,
        default: 0,
      },
      ly: {
        type: Number,
        default: 0,
      },
      hoa: {
        type: Number,
        default: 0,
      },
      sinh: {
        type: Number,
        default: 0,
      },
      van: {
        type: Number,
        default: 0,
      },
      su: {
        type: Number,
        default: 0,
      },
      dia: {
        type: Number,
        default: 0,
      },
      gdcd: {
        type: Number,
        default: 0,
      },
      anh: {
        type: Number,
        default: 0,
      },
      trung: {
        type: Number,
        default: 0,
      },
    },
  },
  nangKhieu: {
    type: Number,
    default: 0,
  },
  khuVuc: {
    type: String,
    default: "",
  },
  doiTuong: {
    type: String,
    default: "",
  },
  tongLop12: {
    type: {
      toan: {
        type: Number,
        default: 0,
      },
      ly: {
        type: Number,
        default: 0,
      },
      hoa: {
        type: Number,
        default: 0,
      },
      sinh: {
        type: Number,
        default: 0,
      },
      van: {
        type: Number,
        default: 0,
      },
      su: {
        type: Number,
        default: 0,
      },
      dia: {
        type: Number,
        default: 0,
      },
      gdcd: {
        type: Number,
        default: 0,
      },
      anh: {
        type: Number,
        default: 0,
      },
      trung: {
        type: Number,
        default: 0,
      },
    },
  },
  danhGiaNangLuc: {
    type: Number,
    default: 0,
  },
  kyThiTHPT: {
    type: {
      tunhien: {
        toan: {
          type: Number,
          default: 0,
        },
        ly: {
          type: Number,
          default: 0,
        },
        hoa: {
          type: Number,
          default: 0,
        },
        sinh: {
          type: Number,
          default: 0,
        },
        van: {
          type: Number,
          default: 0,
        },
        anh: {
          type: Number,
          default: 0,
        },
      },
      xahoi: {
        toan: {
          type: Number,
          default: 0,
        },
        su: {
          type: Number,
          default: 0,
        },
        dia: {
          type: Number,
          default: 0,
        },
        gdcd: {
          type: Number,
          default: 0,
        },
        van: {
          type: Number,
          default: 0,
        },
        anh: {
          type: Number,
          default: 0,
        },
      },
    },
  },
});
module.exports = mongoose.model("scores", scoresSchema);
