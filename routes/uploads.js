const FileType = require("file-type");
const express = require("express");
const router = express.Router();

const path = require("path");
const { s3 } = require("../services/awsInit");
const upload = require("../services/fileUpload");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.put("/", upload, auth, async (req, res) => {
  const fileType = await FileType.fromBuffer(req.file.buffer);
  const fileName = Date.now() + path.extname(req.file.originalname);
  const keyName = path.join(req.user.name, fileName);

  const uploadFile = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: keyName,
      Body: req.file.buffer,
      ACL: "public-read",
      CacheControl: "public, max-age=31536000",
      ContentType: fileType.mime.toString(),
    })
    .promise();
  const user = await User.findById(req.user._id);
  user.profilePic = uploadFile.Location;
  await user.save();

  res.send(user);
});

module.exports = router;
