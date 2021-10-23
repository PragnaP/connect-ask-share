const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearen ", "");
    console.log("middle ware from seperate file and header TOKEN: " + token);

    const authUser = await userModel.findOne({ "tokens.token": token });
    if (!authUser) {
      res.status(500).send({ msg: "No such user found " });
    }
    req.authuser = authUser;

    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "something went wrong in autherization" });
  }
};
module.exports = auth;
