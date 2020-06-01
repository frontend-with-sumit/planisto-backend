const _ = require("lodash");
const bcrypt = require("bcrypt");

const FileType = require("file-type");

const path = require("path");
const express = require("express");
const router = express.Router();

const { s3 } = require("../services/awsInit");
const upload = require("../services/fileUpload");
const auth = require("../middleware/auth");
const { User, validateUser } = require("../models/user");

// upload picture
router.put("/upload", upload, auth, async (req, res) => {
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

// Current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select([
    "-_id",
    "-password",
    "-email",
    "-__v",
  ]);

  res.send(user);
});

router.put("/me", auth, async (req, res) => {
  const { firstName, lastName, country } = req.body;
  const user = await User.findById(req.user._id);

  user.firstName = firstName;
  user.lastName = lastName;
  user.country = country;

  await user.save();

  res.send(user);
});

// Register User
router.post("/", async (req, res) => {
  const { profilePic, firstName, lastName, email, country } = req.body;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("Email already registered");

  const salt = await bcrypt.genSalt(12);
  const password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    profilePic,
    firstName,
    lastName,
    email,
    password,
    country,
  });

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["firstName", "lastName", "country"]));
});

module.exports = router;
