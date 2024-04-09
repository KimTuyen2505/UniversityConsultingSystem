const mongoose = require("mongoose");
const majorSchema = new mongoose.Schema({
  nameMajor: {
    type: String,
  },
  detailMajor: {
    type: String,
  },
});
module.exports = mongoose.model("major", majorSchema);
