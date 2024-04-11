const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  given_name: {
    type: String,
  },
  family_name: {
    type: String,
  },
  avatar: {
    type: String,
    default: "/Images/defaultAvatar.jpg"
  },
  description: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("account", accountSchema);
