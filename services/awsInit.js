const AWS = require("aws-sdk");
const config = require("config");

const s3 = new AWS.S3({
  accessKeyId: config.get("accessKey"),
  secretAccessKey: config.get("secretKey"),
});

module.exports.s3 = s3;
