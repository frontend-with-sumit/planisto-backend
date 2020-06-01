const config = require("config");
const { logger } = require("../services/logger");

module.exports = function () {
  if (!config.get("privateKey")) {
    logger.error("FATAL ERROR: Access key is not provided");
    process.exit(1);
  }
};
