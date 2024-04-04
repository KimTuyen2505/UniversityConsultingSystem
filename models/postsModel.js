const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  idMajor: {
    type: String,
  },
  author: {
    type: String,
  },
  createTime: {
    type: String,
  },
  comments: {
    type: [
      {
        idComment: String,
        idUser: String,
        content: String,
        createTime: String,
        reply: [
          {
            idUser: String,
            content: String,
            createTime: String,
          },
        ],
      },
    ],
    default: [],
  },
});
module.exports = mongoose.model("posts", postSchema);
