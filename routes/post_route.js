const express = require("express");
const postRouter = express.Router();
const authorization = require("../middleware/authorization_middleware");
const { addPost, fetchUserPost } = require("../controllers/post_controller");
postRouter.route("/addPost").post(authorization, addPost);

postRouter.route("/fetchUserPost").get(authorization, fetchUserPost);

module.exports = postRouter;
