const path = require("path");
const Post = require(path.join(__dirname, "../models/posts.js"));

const createPost = async (req, res) => {
  res.send("create post");
};

const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find({});
    res.json(data);
  } catch (err) {
    console.log("err ", err);
  }
};

const getOnePost = async (req, res) => {
  const id = req.params["id"];

  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

const updatePost = async (req, res) => {
  res.send("update post");
};

// const deletePost = async (req, res) => {
//   //res.send(req.params["id"]);
//   res.json(400, {
//     error: 1,
//     msg: "some error",
//   });
//   console.log(req.params["id"]);
//   const id = req.params["id"];
//   const deleted = await Post.findByIdAndDelete(id);
//   res.redirect("/posts");
// };

// // D-Delete the Post and its data
// router.delete("/:id", async (req, res) => {
// const { id } = req.params;
// const deleted = await Post.findByIdAndDelete(id);
// res.redirect("/posts");
// });

const showStats = async (req, res) => {
  res.send("show stats");
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  showStats,
  getOnePost,
};
