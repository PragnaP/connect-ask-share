const mongoose = require("mongoose");
//https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/
const connectDB = async () => {
  try {
    //await mongoose.connect("mongodb://127.0.0.1:27017/");
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("connected ......!!!");
  } catch (error) {
    console.log("Failed to connect" + error);
  }
};

connectDB();
