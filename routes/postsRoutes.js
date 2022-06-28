const express = require("express");
const router = express.Router();
const path = require("path");

const {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  showMyPosts,
  getPostsByLocation
} = require("../controllers/postsController");


router.route("/").post(createPost).get(getAllPosts);
router.route("/search").get(getPostsByLocation);
// router.route("/new").get(getForm);
router.route("/myposts/:userid").get(showMyPosts);
router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
