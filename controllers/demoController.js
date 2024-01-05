const demoModel = require("../models/demoModel");

exports.getAll = (req, res) => {
  demoModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataDemos: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.addDemo = async (req, res) => {
  const { data } = req.body;
  const demo = new demoModel({
    data: data,
  });
  return demo
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created demo successfully",
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

exports.updateDemo = (req, res) => {
  const { data } = req.body;
  demoModel
    .findByIdAndUpdate(req.body.id, {
      data: data,
    })
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update demo successfully",
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

exports.deleteDemo = (req, res) => {
    demoModel
    .findByIdAndDelete(req.body.id, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete demo successfully",
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
