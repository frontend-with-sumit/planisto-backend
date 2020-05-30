const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todoDb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB...."))
    .catch(() => console.log("Couldn't connect to DB...."));
};
