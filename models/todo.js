const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  email: { type: String },
});

const todoSchema = new mongoose.Schema({
  user: {
    type: userSchema,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  createdOn: {
    type: String,
    required: true,
  },
  todoAt: {
    type: String,
    required: true,
  },
  category: {
    type: categorySchema,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: Date.now() - 300000 },
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().max(255).trim().required(),
    description: Joi.string().trim().allow(""),
    createdOn: Joi.string().required(),
    todoAt: Joi.string().trim().required(),
    categoryId: Joi.string().required(),
    isComplete: Joi.string().trim(),
  });

  return schema.validate(todo);
}

module.exports.Todo = Todo;
module.exports.validateTodo = validateTodo;
