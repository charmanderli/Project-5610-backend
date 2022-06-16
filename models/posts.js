const { truncateSync } = require("fs");
const mongoose = require("mongoose");
const { normalize } = require("path");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: false,
  },

  section: {
    type: String,
    enum: ["food", "experiences", "stores", "services"],
  },

  body: {
    type: String,
    required: true,
  },

  tags: {
    type: Array,
    required: false,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
