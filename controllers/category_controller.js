const categoryModel = require("../models/category_model");
// const path = require("path");
const CATEGORY_IMAGE_FOLDER_NAME = "cat_img/";
addNewCategory = async (req, res, next) => {
  try {
    var fullPath = CATEGORY_IMAGE_FOLDER_NAME + req.file.filename;

    console.log("fullPath");
    console.log(fullPath);
    console.log(req.body.catName);
    console.log(req.body.catDescription);
    console.log(req.body.isVisible);

    var document = {
      catName: req.body.catName,
      catPhotoURL: fullPath,
      catDescription: req.body.catDescription,
      isVisible: req.body.isVisible,
    };

    const cat = categoryModel(document);
    await cat.save();
    res.status(201).json({
      status: 1,
      message: "Category Added Successfully!",
      data: cat,
    });
  } catch (e) {
    console.log("ERROR");
    console.log(e);

    next(e);
  }
}; //);

fetchCategories = async (req, res, next) => {
  try {
    // const match = {};

    // match.isVisible = "true" === "true";

    var category = {};
    // console.log(req.body.id);
    console.log(req.query.id);
    if (!req.query.id) {
      category = await categoryModel.find({isVisible: true});
    } else {
      category = await categoryModel.findOne({
        isVisible: true,
        _id: req.query.id,
      });
    }

    if (!category) {
      res.status(200).json({
        status: 0,
        message: "No category found",
        data: {},
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Category found",
        data: category,
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { addNewCategory, fetchCategories };
// module.exports = fetchCategories;
