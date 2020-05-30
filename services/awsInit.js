const AWS = require("aws-sdk");
const config = require("config");

const s3 = new AWS.S3({
  accessKeyId: config.get("AWS_ACCESS_KEY_ID"),
  secretAccessKey: config.get("AWS_SECRET_KEY_ID"),
});

module.exports.s3 = s3;
