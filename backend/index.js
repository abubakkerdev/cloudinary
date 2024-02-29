const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
var cors = require("cors");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfvduibc1",
  api_key: "713844728146317",
  api_secret: "Qnafut57XyEzt1Sfkbd8CCJfLb0",
});

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "5mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/img", (req, res) => {
  cloudinary.uploader.upload(
    req.body.input,
    { public_id: "olympic_flag" },
    function (error, result) {
      // console.log(result.url);
      res.send(result.url);
    }
  );
});

// http://localhost:3000/img/olympic_flag

app.get("/img/:public_id", (req, res) => {
  const public_id = req.params.public_id;
  cloudinary.uploader.destroy(public_id, function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).send("Error deleting image from Cloudinary");
    }
    res.send("Image deleted successfully");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
