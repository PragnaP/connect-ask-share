const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema(
  {
    catName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (value.length < 3) {
          throw new Error("Please Provide Proper Name");
        }
      },
    },
    catPhotoURL: {
      type: String,
      trim: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
     
    },
    catDescription: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 10) {
          throw new Error("Please Provide Proper Description");
        }
      },
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
