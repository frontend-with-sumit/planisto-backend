const mongoose = require("mongoose");
const config = require("config");
const { logger } = require("../services/logger");

module.exports = function () {
  const db = config.get("MONGODB_URI");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to DB...."))
    .catch(() => logger.info("Couldn't connect to DB...."));
};
