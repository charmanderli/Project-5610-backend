const mongoose = require("mongoose");
const { normalize } = require("path");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  nickName: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: true,
  },

  tags: {
    type: Array,
    required: false,
  },

  likes: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
