const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  email: { type: String },
});

const categorySchema = new mongoose.Schema({
  user: {
    type: userSchema,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  color: {
    type: String,
    default: "#fff",
  },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().max(255).trim().required(),
    color: Joi.string().max(10).trim(),
  });

  return schema.validate(category);
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
