const express = require("express");
const router = express.Router();
const path = require("path");

const {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  showStats,
} = require("../controllers/postsController");

// C-Show the make new Post form page
router.get("/new", (req, res) => {
  res.render("posts/new");
});

router.route("/").post(createPost).get(getAllPosts);
router.route("/stats").get(showStats);
router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
