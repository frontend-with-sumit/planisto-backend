const express = require("express");
const router = express.Router();

const { Feedback, validateFeedback } = require("../models/feedback");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { email, comments, usability, uiExperience } = req.body;

  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email not registered");

  const feedback = new Feedback({
    email,
    comments,
    usability,
    uiExperience,
  });

  await feedback.save();

  res.send(feedback);
});

module.exports = router;
