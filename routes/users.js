const _ = require("lodash");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  const { profilePic, firstName, lastName, email, country } = req.body;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("Email already registered");

  const salt = await bcrypt.genSalt(12);
  const password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    profilePic,
    firstName,
    lastName,
    email,
    password,
    country,
  });

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["firstName", "lastName", "country"]));
});

module.exports = router;
