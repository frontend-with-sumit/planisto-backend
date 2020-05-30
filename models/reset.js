const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const resetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
  },
});

const Reset = mongoose.model("Reset", resetSchema);

function validateCredentials(credentials) {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().regex(/[^\s]/).trim().required(),
    confirmPassword: Joi.string().trim().required(),
  });

  return schema.validate(credentials);
}

module.exports.Reset = Reset;
module.exports.validateCredentials = validateCredentials;
