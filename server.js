const express = require("express");

const connectDB = require("./Database");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

const cors = require("cors");
app.use(cors());

//routes
const account = require("./routes/accountRoute");
const major = require("./routes/majorRoute");

//using
app.use(account);
app.use(major);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

var request = require("request");
app.post("/fetch-html", (req, res) => {
  request(req.body.link, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});
