require("express-async-errors");
const { logger, transport } = require("../services/logger");

module.exports = function () {
  // uncaughtExceptions
  logger.exceptions.handle(transport(), transport("uncaughtExceptions"));

  // unhandledRejections
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // pipeline errors
  logger.add(transport()).add(transport("logfile"));
};
