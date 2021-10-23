const userModel = require("../models/user_model");
const USER_IMAGE_FOLDER_NAME = "user_img";

addUser = async (req, res, next) => {
  // const _user = userModel(req.body);
  try {
    var fullPath = USER_IMAGE_FOLDER_NAME + req.file.filename;

    console.log("fullPath");
    console.log(fullPath);

    var document = {
      name: req.body.name,
      userEmail: req.body.userEmail,
      password: req.body.password,
      isActive: req.body.isActive,
      userPhotoURL: fullPath,
    };

    const user = userModel(document);
    await user.save();
    const token = await user.generateAuthToken();
    console.log({ user, token: token });

    res.status(200).send({ user, token: token });
  } catch (error) {
    res.status(400).send(error);
    // res.send(error);
    console.log(error);
  }
};
userLogin = async (req, res) => {
  console.log("ncnnnnnnnnn" + req.body.userEmail, req.body.password);
  try {
    const user = await userModel.findByCredentials(
      req.body.userEmail,
      req.body.password,
    );
    if (!user) {
      res.status(404).send({ msg: "user not found" });
    } else {
      const token = await user.generateAuthToken();
      // res.send({ user: user.dataToSend(), loginToken: token });
      res.send({ user, loginToken: token });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "somehitng went wrong",
    });
  }
};
module.exports = { addUser, userLogin };
