const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select([
    "-_id",
    "-password",
    "-email",
    "-__v",
  ]);

  res.send(user);
});

router.put("/", auth, async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await User.findById(req.user._id);

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();
  res.send(user);
});

module.exports = router;
