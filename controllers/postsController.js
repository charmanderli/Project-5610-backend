const path = require("path");
const Post = require(path.join(__dirname, "../models/posts.js"));

const { body, validationResult } = require("express-validator");
const createPost = async (req, res) => {
  body("title").isLength({ min: 2 });
  body("body").isLength({ min: 5 });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newPost = new Post(req.body);
  const data = await newPost.save();

  res.json(data);
};

// // // C-Show the make new Post form page
// router.get("/new", (req, res) => {
//   res.render("posts/new");
// });

// const getForm =async (req, res) => {
//   res.render("posts/new");
// };

const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find({});
    res.json(data);
  } catch (err) {
    console.log("err ", err);
  }
};

const getOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

const showMyPosts = async (req, res) => {
  const { userid } = req.params;

  // res.send(userid);
  try {
    const post = await Post.find({
      userId: userid,
    }).exec();
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

const updatePost = async (req, res) => {
  body("title").isLength({ min: 2 });
  body("body").isLength({ min: 5 });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // res.status(200).json({ msg: "Called update!" });
  try {
    const { id } = req.params;

    console.log(req.body);
    const post = await Post.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
  } catch (err) {
    console.log(err);
  }

  // res.send(req.body);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  // res.status(200).json({ msg: "USER DID IT" });

  try {
    console.log(req.params);
    const data = await Post.findByIdAndDelete(id);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

const showStats = async (req, res) => {
  res.send("show stats");
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  showMyPosts,
  getOnePost,
  deletePost,
  // getForm,
};
