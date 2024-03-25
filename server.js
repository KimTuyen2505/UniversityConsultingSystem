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
var cheerio = require("cheerio");
app.post("/fetch-major", (req, res) => {
  request(req.body.link, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var data = $(body).find(".col-md-6");
      var allMajor = [];
      data.each(function (index, element) {
        let listMajor = "";
        $(element)
          .find(".list-group")
          .each(function (index2, element2) {
            $(element2)
              .find(".list-group-item")
              .each(function (index3, element3) {
                let text = $(this).text();
                listMajor += text.trim().replace(/\s+/g, " ") + ",";
              });
          });
        listMajor.slice(listMajor.length - 1, 1);
        allMajor.push(listMajor);
      });
      res.send(allMajor);
    } else {
      res.send("Error");
    }
  });
});
