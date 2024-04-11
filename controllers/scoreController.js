const scoreModel = require("../models/scoreModel");

exports.getAll = (req, res) => {
  scoreModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataScores: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.addScores = async (req, res) => {
  const {
    idUser,
    HK1Lop11,
    HK2Lop11,
    HK1Lop12,
    nangKhieu,
    khuVuc,
    doiTuong,
    tongLop12,
    danhGiaNangLuc,
    kyThiTHPT,
  } = req.body;
  const scores = new scoreModel({
    idUser: idUser,
    HK1Lop11: HK1Lop11,
    HK2Lop11: HK2Lop11,
    HK1Lop12: HK1Lop12,
    nangKhieu: nangKhieu,
    khuVuc: khuVuc,
    doiTuong: doiTuong,
    tongLop12: tongLop12,
    danhGiaNangLuc: danhGiaNangLuc,
    kyThiTHPT: kyThiTHPT,
  });
  return scores
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created scores successfully",
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.updateScores = (req, res) => {
  const {
    HK1Lop11,
    HK2Lop11,
    HK1Lop12,
    nangKhieu,
    khuVuc,
    doiTuong,
    tongLop12,
    danhGiaNangLuc,
    kyThiTHPT,
  } = req.body;
  scoreModel
    .findByIdAndUpdate(req.body.id, {
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
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update scores successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
