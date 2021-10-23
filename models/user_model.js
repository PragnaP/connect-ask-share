const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please provide proper email address!");
        }
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      //   minlength: 7,
      validate(value) {
        if (value.length < 6) {
          throw new Error("password lenth should greater than 6 characteres.");
        }
        if (value.toLowerCase().includes("password")) {
          throw new Error('password is not "password" allowed!');
        }
      },
    },

    userPhotoURL: {
      type: String,
      trim: true,
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

//method is accessible on instance called as instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  console.log("this is id :" + user._id.toString());

  const token = jwt.sign({ _id: user._id.toString() }, "Pr@Gn@910"); //any sting can be here
  console.log("this is token :" + token);

  user.tokens = user.tokens.concat({ token: token });
  user.save();
  return token;
};
//method for model
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//accessible for model
userSchema.statics.findByCredentials = async (email, password) => {
  console.log("email, password::::::::");
  console.log(email, password);

  const _user = await User.findOne({ userEmail: email });

  if (!_user) {
    throw new Error("Unable to login");
  }
  console.log("user data!!!!!");
  console.log(_user);
  const isMatch = bcrypt.compareSync(password, _user.password);

  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login2");
  }

  return _user;
};

//middleware for schema model==>
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("this is middle ware for schema");
  console.log(user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8); //8 is standard
  }
  next();
});

const User = new mongoose.model("User_Master", userSchema);
module.exports = User;
