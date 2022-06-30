const express = require("express");
const router = express.Router();
const path = require("path");

const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/usersController");

router
  .route("/:userId")
  .get(getProfile)
  .patch(updateProfile)
  .delete(deleteProfile);

module.exports = router;
