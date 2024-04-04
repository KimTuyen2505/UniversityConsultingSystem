const postsModel = require("../models/postsModel");

exports.getAll = (req, res) => {
  postsModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataPosts: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.addPosts = async (req, res) => {
  const { title, content, idMajor, author, createTime } = req.body;
  const posts = new postsModel({
    title: title,
    content: content,
    idMajor: idMajor,
    author: author,
    createTime: createTime,
  });
  return posts
    .save()
    .then((data) => {
      return res.status(201).json({
        success: true,
        message: "Created posts successfully",
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

exports.updatePosts = (req, res) => {
  const { title, content, createTime } = req.body;
  postsModel
    .findByIdAndUpdate(req.body.id, {
      title: title,
      content: content,
      createTime: createTime,
    })
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update posts successfully",
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

exports.deletePosts = (req, res) => {
  postsModel
    .findByIdAndDelete(req.body.id, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete posts successfully",
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

exports.addComment = (req, res) => {
  const { comments } = req.body;
  postsModel
    .findByIdAndUpdate(req.body.id, {
      comments: comments,
    })
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Update comments successfully",
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
