const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { User } = require("../models/user");
const { Category, validateCategory } = require("../models/category");

router.get("/", auth, async (req, res) => {
  const categories = await Category.find({ "user._id": req.user._id });

  res.send(categories);
});

router.get("/:id", auth, async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).send("The category with the given ID was not found");

  res.send(category);
});

router.post("/", auth, async (req, res) => {
  const { name, color } = req.body;
  const { _id } = req.user;

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(_id);

  const category = await Category.findOne({
    $and: [{ name }, { "user._id": user._id }],
  });

  if (category) return res.status(400).send("Category already exists");

  const newCategory = new Category({
    user: {
      _id,
      email: user.email,
    },
    name,
    color,
  });

  await newCategory.save();

  res.send(newCategory);
});

router.put("/:id", auth, async (req, res) => {
  const { name, color } = req.body;

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.params.id);
  if (!category) return res.status(400).send("Invalid category");

  category.name = name;
  category.color = color;

  if (!category)
    return res.status(404).send("The category with the given ID was not found");

  await category.save();

  res.send(category);
});

router.delete("/:id", auth, async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
