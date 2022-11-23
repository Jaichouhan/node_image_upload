const mongoose = require("mongoose");

const image = new mongoose.Schema({
  image: {
    type: Object,
  },
  name: {
    type: String,
  },
});

const imageUrl = mongoose.model("image", image);

module.exports = imageUrl;
