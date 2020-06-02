const multer = require("multer");

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new Error("Please upload files with .jpg, .jpeg, .png extensions only")
      );

    cb(undefined, true);
  },
}).single("file");

module.exports = upload;
