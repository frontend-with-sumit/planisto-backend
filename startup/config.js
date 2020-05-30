const config = require("config");

module.exports = function () {
  if (
    !config.get("PRIVATE_KEY") &&
    !config.get("AWS_ACCESS_KEY_ID") &&
    !config.get("AWS_SECRET_KEY_ID") &&
    !config.get("BUCKET_NAME")
  ) {
    console.log("FATAL ERROR: Access keys are not provided");
    process.exit(1);
  }
};
