const path = require("path");
const User = require(path.join(__dirname, "../models/users.js"));

const getProfile = async (req, res) => {
  const { userid } = req.params;

  // res.send(userid);
  try {
    const profile = await User.find({
      userId: userid,
    }).exec();
    res.json(profile);
  } catch (e) {
    console.log(e);
  }
};

const createProfile = async (req, res) => {
  //   body("title").isLength({ min: 2 });
  //   body("body").isLength({ min: 5 });

  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  const { userid } = req.params;
  try {
    const profile = await User.find({
      userId: userid,
    }).exec();
    if (!profile) {
      const newProfile = new User(req.body);
      const data = await newProfile.save();

      res.json(data);
    }
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
    const { userid } = req.params;

    console.log(req.body);
    const profile = await User.findByIdAndUpdate(userid, req.body, {
      runValidators: true,
      new: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteProfile = async (req, res) => {
  res.send("deleteProfile");
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
