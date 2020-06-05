const express = require("express");
const request = require("request");
const users = require("../routes/users");
const auth = require("../routes/auth");
const reset = require("../routes/reset");
const categories = require("../routes/categories");
const feedbacks = require("../routes/feedbacks");
const todos = require("../routes/todos");
const uploads = require("../routes/uploads");
const me = require("../routes/me");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.use(express.json());
  app.use("/upload", uploads);
  app.use("/me", me);
  app.use("/register", users);
  app.use("/auth", auth);
  app.use("/forgot-password", reset);
  app.use("/categories", categories);
  app.use("/todos", todos);
  app.use("/feedback", feedbacks);

  app.get("/countries", (req, res) => {
    request(
      {
        url: "https://restcountries.eu/rest/v2/all",
      },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: "error", message: err.message });
        }

        res.json(JSON.parse(body));
      }
    );
  });
  app.use(error);
};
