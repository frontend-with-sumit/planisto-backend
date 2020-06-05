const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

const { User } = require("../models/user");
const { Category } = require("../models/category");
const { Todo, validateTodo } = require("../models/todo");

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ "user._id": req.user._id }).sort("toDoAt");

  res.send(todos);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const todos = await Todo.findById(req.params.id);

  if (!todos) return res.status(404).send("Todo doesn't exist");

  res.send(todos);
});

router.post("/", auth, async (req, res) => {
  const {
    title,
    description,
    categoryId,
    createdOn,
    todoAt,
    isComplete,
  } = req.body;

  const { _id } = req.user;

  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(_id);

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const newTodo = new Todo({
    user: {
      _id,
      email: user.email,
    },
    title,
    description,
    createdOn,
    todoAt,
    category: {
      _id: category._id,
      name: category.name,
      color: category.color,
    },
    isComplete,
  });

  await newTodo.save();

  res.send(newTodo);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { title, description, categoryId, createdOn, todoAt } = req.body;

  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(categoryId);

  const todo = await Todo.findById(req.params.id);

  todo.title = title;
  todo.description = description;
  todo.category = {
    _id: category._id,
    name: category.name,
    color: category.color,
  };
  todo.createdOn = createdOn;
  todo.todoAt = todoAt;

  if (!todo)
    return res.status(404).send("The todo with the give ID was not found");

  await todo.save();

  res.send(todo);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

module.exports = router;
