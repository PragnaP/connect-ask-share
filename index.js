const express = require("express");
const multer = require("multer");
const categoryRouter = require("./routes/category_route");
const postRouter = require("./routes/post_route");
const userRouter = require("./routes/user_route");
const errorMiddleware = require("./middleware/error_middleware");
require("dotenv").config({ path: "./config/dev.env" });

require("./config/db");
// const upload = require("./utils/fileupload");
const PORT = process.env.PORT || 3000;

// const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);


// app.use("/category", categoryRouter);

app.use(errorMiddleware);

app.use(middlewareThree);
app.use(middlewareOne);

app.get("/", middlewareTwo, middlewareFour, (req, res) => {
  console.log("Inside Home Page");
  console.log(req.data); //[ { name: 'pragna' } ]
  console.log(res.data1); //[ { name: 'pragna1' } ]
  res.send("Home Page");
});

function middlewareOne(req, res, next) {
  console.log("Middleware One");
  next();
}
function middlewareFour(req, res, next) {
  console.log("Middleware Four");

  next();
}

function middlewareTwo(req, res, next) {
  console.log("Middleware Two");
  req.data = [{ name: "pragna" }];
  res.data1 = [{ name: "pragna1" }];
  next();
}

function middlewareThree(req, res, next) {
  console.log("Middleware Three");
  next();
}

// app.get("/", (req, res) => {
//   res.send("this is working ok!!!!");
// });

app.listen(PORT, () => {
  console.log("server is runnig... ");
});
