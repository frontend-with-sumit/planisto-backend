const { logger } = require("../services/logger");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { validateCredentials } = require("../models/reset");

router.put("/", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const { error } = validateCredentials(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email not registered");

  if (password === confirmPassword) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;

    try {
      await user.save();
      res.send(user);
    } catch (ex) {
      logger.error(ex);
    }
  } else {
    res.status(400).send("Passwords didn't match");
  }
});

module.exports = router;
