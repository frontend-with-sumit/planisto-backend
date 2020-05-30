const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  comments: {
    type: String,
    required: true,
    trim: true,
  },
  usability: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 5,
  },
  uiExperience: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 5,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

function validateFeedback(feedback) {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    comments: Joi.string().trim().required(),
    usability: Joi.number().integer().min(0).max(5).required(),
    uiExperience: Joi.number().integer().min(0).max(5).required(),
  });

  return schema.validate(feedback);
}

module.exports.Feedback = Feedback;
module.exports.validateFeedback = validateFeedback;
