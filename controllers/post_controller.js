const postModel = require("../models/post_model");
const userModel = require("../models/user_model");

addPost = async (req, res, next) => {
  try {
    const _post = postModel(req.body);
    const addPost = await _post.save();
    res.status(200).send(addPost);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: e.message });
  }
};

fetchUserPost = async (req, res, next) => {
  try {
    console.log("user ID " + req.authuser._id);
    const _postList = await postModel.find({ postCreator: req.authuser._id });
    if (!_postList) {
      res
        .status(404)
        .send({ msg: "no post found for user " + req.authuser.name });
    }
    if (_postList.length <= 0) {
      res
        .status(404)
        .send({ msg: "no post found for user " + req.authuser.name });
    }
    res.status(200).send(_postList);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: e.message });
  }
};
module.exports = { addPost, fetchUserPost };
