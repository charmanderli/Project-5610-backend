const express = require("express");
const router = express.Router();

const path = require("path");
const Post = require(path.join(__dirname, "../models/posts.js"));

// C-Show the make new Post form page
router.get("/new", (req, res) => {
  res.render("posts/new");
});

// R-Overview of all posts
router.get("/", async (req, res) => {
  
  try {
    const data = await Post.find({});
    res.json(data);
  } catch (err) {
    console.log("err ", err);
  }
});

// R-Overview of a specific Post and its details
router.get("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    const post = await Post.findById(_id);
    console.log(post);
    res.render("posts/show", { post });
  } catch (e) {
    next(e);
  }
});

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
    res.redirect(`/posts/${newPost._id}`);
  }
);

// U-Show the edit Post form
router.get("/:_id/edit", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const post = await Post.findById(_id);
    res.render("posts/edit", { post });
  } catch (e) {
    next(e);
  }
});

// U-Update the edit Post form and put data
router.put(
  "/:_id",

  body("title").isLength({ min: 2 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id } = req.params;
    const post = await Post.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      new: true,
    });

    res.redirect(`/posts/${post._id}`);
  }
);

// D-Delete the Post and its data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Post.findByIdAndDelete(id);
  res.redirect("/posts");
});

module.exports = router;
