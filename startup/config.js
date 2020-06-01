const config = require("config");
const { logger } = require("../services/logger");

module.exports = function () {
  if (
    !config.get("PRIVATE_KEY") &&
    !config.get("AWS_ACCESS_KEY_ID") &&
    !config.get("AWS_SECRET_KEY_ID") &&
    !config.get("BUCKET_NAME")
  ) {
    logger.error("FATAL ERROR: Access keys are not provided");
    process.exit(1);
  }
};
