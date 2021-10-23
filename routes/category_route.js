const express = require("express");
const multer = require("multer");
const categoryRouter = express.Router();
const path = require("path");
const CATEGORY_IMAGE_FOLDER_NAME = "cat_img";

const {
  addNewCategory,
  fetchCategories,
} = require("../controllers/category_controller");
// const fetchCategories = require("../controllers/category_controller");
// const path = require("path");
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: CATEGORY_IMAGE_FOLDER_NAME,
  filename: function (req, file, fn) {
    fn(
      null,
      new Date().getTime().toString() +
        "-category-" +
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
// categoryRouter.route("/addCategory").post(addcategory);
categoryRouter
  .route("/addCategory")
  .post(upload.single("photo"), addNewCategory);
categoryRouter.route("/fetchCategories").get(fetchCategories);

module.exports = categoryRouter;
