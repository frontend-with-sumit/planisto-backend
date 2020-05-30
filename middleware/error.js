const { logger } = require("../services/logger");

module.exports = function (err, req, res, next) {
  logger.log("error", err.message);

  res.status(500).send("Something failed");
};
