const express = require("express");
const multer = require("multer");
const userRouter = express.Router();
const path = require("path");
const USER_IMAGE_FOLDER_NAME = "user_img";
const { addUser, userLogin } = require("../controllers/user_controller");

const storageEngine = multer.diskStorage({
  destination: USER_IMAGE_FOLDER_NAME,
  filename: function (req, file, fn) {
    fn(
      null,
      new Date().getTime().toString() +
        "-user-" +
        file.fieldname +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({
  // dest: "avatars",
  storage: storageEngine,

  limits: {
    fileSize: 10000000, //unit in to bytes
  },
  fileFilter(req, file, callback) {
    console.log(file.originalname);
    var ext = file.originalname;
    //if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    if (!ext.match(/\.(png|jpg|gif|jpeg)$/)) {
      return callback(
        new Error("Only images (.png,.jpg,.gif,.jpeg) are allowed")
      );
    }
    callback(null, true);
  },
});

userRouter.route("/adduser").post(upload.single("userphoto"), addUser);
userRouter.route("/userLogin").post(userLogin);
module.exports = userRouter;
