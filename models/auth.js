const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    maxlength: 8,
  },
});

const Auth = mongoose.model("Auth", authSchema);

function validateCredentials(credentials) {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required().label("Email"),
    password: Joi.string().min(6).max(255).required().label("Password"),
  });

  return schema.validate(credentials);
}

module.exports.Auth = Auth;
module.exports.validateCredentials = validateCredentials;
