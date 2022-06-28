const express = require("express");
const router = express.Router();
const path = require("path");

const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/usersController");

router
  .route("/:userid")
  .get(getProfile)
  .post(createProfile)
  .patch(updateProfile)
  .delete(deleteProfile);

module.exports = router;
