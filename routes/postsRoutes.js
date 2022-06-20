const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require(path.join(__dirname, "../models/posts.js"));
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
router.route("/:id").get(getOnePost).patch(updatePost);

const { body, validationResult } = require("express-validator");
// C-Submit the make new Post form and post data
router.post(
  "/",
  body("title").isLength({ min: 2 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newPost = new Post(req.body);
    await newPost.save();
    console.log(req.body);
    res.redirect(`/posts/${newPost.id}`);
  }
);

// U-Update the edit Post form and put data
router.put(
  "/:id",

  body("title").isLength({ min: 2 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    res.redirect(`/posts/${post.id}`);
  }
);

// D-Delete the Post and its data
router.delete("/:id", async (req, res) => {
  const id = req.params["id"];
  //res.status(200).json({msg: 'USER DID IT'});

  console.log(req.params);
  const data = await Post.findByIdAndDelete(id);
  res.json(data);
  // res.redirect("/posts");
});

module.exports = router;
