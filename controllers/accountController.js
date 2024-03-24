const accountModel = require("../models/accountModel");

exports.getAll = (req, res) => {
  accountModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataAccounts: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.addAccount = async (req, res) => {
  const { username, password, email, given_name, family_name } = req.body;
  const account = new accountModel({
    username: username,
    password: password,
    email: email,
    given_name: given_name,
    family_name: family_name,
  });
  return account
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created account successfully",
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

exports.updateName = (req, res) => {
  const { given_name, family_name } = req.body;
  accountModel
    .findByIdAndUpdate(req.body.id, {
      given_name: given_name,
      family_name: family_name,
    })
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update name account successfully",
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
exports.updatePassword = (req, res) => {
  const { password } = req.body;
  accountModel
    .findByIdAndUpdate(req.body.id, {
      password: password,
    })
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update password successfully",
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

exports.deleteAccount = (req, res) => {
  accountModel
    .findByIdAndDelete(req.body.id, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete account successfully",
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
