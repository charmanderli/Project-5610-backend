const path = require("path");
const User = require(path.join(__dirname, "../models/users.js"));

const getProfile = async (req, res) => {
  const { userId } = req.params;

  // res.send(userid);
  try {
    const profile = await User.findOne({
      userId: userId,
    });
    res.json(profile);
  } catch (e) {
    console.log(e);
  }
};

const updateProfile = async (req, res) => {
  // body("title").isLength({ min: 2 });
  // body("body").isLength({ min: 5 });

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  // res.status(200).json({ msg: "Called update!" });
  try {
    const { userId } = req.params;
    const query = {
      userId: userId,
    };
    console.log(req.body);
    const profile = await User.findOneAndUpdate(query, req.body, {
      runValidators: true,
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    res.json(profile);
  } catch (err) {
    console.log(err);
  }
};

const deleteProfile = async (req, res) => {
  res.send("deleteProfile");
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
