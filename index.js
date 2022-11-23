const express = require("express");
const app = express();
var multer = require("multer");
const imageUrl = require("./ImageUrl");
const mongoose = require("mongoose");
app.use("/uploads", express.static("uploads"));

const db = "mongodb://localhost:27017/image";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const StorageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImg = multer({
  storage: StorageImage,
}).single("image");

app.post("/image", (req, res) => {
  try {
    uploadImg(req, res, async (err) => {
      const image = new imageUrl({
        image: `http://localhost:5678/uploads/${req.file.filename}`,
        name: req.body.name,
      });
      await image.save();
      return res.json({
        image: `http://localhost:5678/uploads/${req.file.filename}`,
      });
    });
  } catch (error) {
    res.status(400).send(error, "error");
  }
});

app.listen(5678, () => {
  console.log(`your server listin http://localhost:${5678}`);
});
