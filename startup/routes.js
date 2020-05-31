const express = require("express");
const cors = require("cors");
const users = require("../routes/users");
const auth = require("../routes/auth");
const reset = require("../routes/reset");
const categories = require("../routes/categories");
const feedbacks = require("../routes/feedbacks");
const todos = require("../routes/todos");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/register", users);
  app.use("/auth", auth);
  app.use("/forgot-password", reset);
  app.use("/categories", categories);
  app.use("/todos", todos);
  app.use("/feedback", feedbacks);
  app.use(error);
};
