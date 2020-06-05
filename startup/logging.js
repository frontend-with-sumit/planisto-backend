require("express-async-errors");
require("winston-mongodb");
const config = require("config");
const { logger, transport, dbTransport } = require("../services/logger");

module.exports = function () {
  // uncaughtExceptions
  logger.exceptions.handle([
    transport(),
    transport("uncaughtExceptions"),
    dbTransport("exceptions", "error"),
  ]);


  // unhandledRejections
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // pipeline errors
  logger
    .add(transport())
    .add(transport("logfile"))
    .add(dbTransport("errors", "error"));
};
