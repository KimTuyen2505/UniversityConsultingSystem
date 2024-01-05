const mongoose = require("mongoose");
const demoSchema = new mongoose.Schema({
    data: {
        type: String,
        require: true,
    }
});
module.exports = mongoose.model("demo", demoSchema);