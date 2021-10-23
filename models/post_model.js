const mongoose = require("mongoose");



const postSchema = new mongoose.Schema({
  postName: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  postDescription: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 200,
    trim: true,
  },
  postCreator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Master",
  },
});
const postModel = mongoose.model("Post_Master", postSchema);

module.exports = postModel;
