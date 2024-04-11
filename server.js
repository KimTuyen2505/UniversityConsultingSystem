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
const posts = require("./routes/postsRoute");
const chats = require("./routes/chatRoute");
const scores = require("./routes/scoresRoute");

//using
app.use(account);
app.use(major);
app.use(posts);
app.use(chats);
app.use(scores);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

var request = require("request");
var cheerio = require("cheerio");
app.post("/fetch-major", (req, res) => {
  request(req.body.link, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var data = $(body).find(".col-md-6");
      var allMajor = [];
      data.each(function (index, element) {
        let listMajor = { detail: "", name: "" };
        $(element)
          .find(".list-group")
          .each(function (index2, element2) {
            $(element2)
              .find(".list-group-item")
              .each(function (index3, element3) {
                let text = $(this).text();
                let link = $(this).attr("href");
                listMajor["detail"] += link + ",";
                listMajor["name"] += text.trim().replace(/\s+/g, " ") + ",";
              });
          });
        listMajor["detail"].slice(listMajor["detail"].length - 1, 1);
        listMajor["name"].slice(listMajor["name"].length - 1, 1);
        allMajor.push(listMajor);
      });
      // console.log(allMajor);
      res.send(allMajor);
    } else {
      res.send("Error");
    }
  });
});
app.post("/fetch-detail-major", (req, res) => {
  request(req.body.link, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      let url = "https://tuyensinh.tdmu.edu.vn";
      var data = $(body).find(".noidungbaidang img");
      let listImage = [];
      data.each(function (index, element) {
        listImage.push(`${url}${$(element).attr("src")}`);
      });
      res.send(listImage);
    } else {
      res.send("Error");
    }
  });
});
