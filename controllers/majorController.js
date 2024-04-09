const majorModel = require("../models/majorModel");

exports.getAll = (req, res) => {
  majorModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataMajors: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.addMajor = async (req, res) => {
  const { nameMajor, detailMajor } = req.body;
  const major = new majorModel({
    nameMajor: nameMajor,
    detailMajor: detailMajor,
  });
  return major
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created major successfully",
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

exports.updateMajor = (req, res) => {
  const { nameMajor } = req.body;
  majorModel
    .findByIdAndUpdate(req.body.id, {
      nameMajor: nameMajor,
    })
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update major successfully",
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

exports.deleteMajor = (req, res) => {
  majorModel
    .findByIdAndDelete(req.body.id, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete major successfully",
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
