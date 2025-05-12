const cookieParser = require("cookie-parser");
const express = require("express");
const { loginRoute } = require("./routes/loginRoute");
const { signinRoute } = require("./routes/signupRoute");
const { mappingGet } = require("./service/mappingUid");
const todoItems = require("./module/todo_db");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded());
app.use(express.json());   
app.use(cookieParser());

app.set("view engine", "ejs");

const loggedInUserOnly = (req, res, next) => {
  const userUid = req.cookies.uid;

  if (!userUid) {
    return res.redirect("/login");
  }
  const user = mappingGet(userUid);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

app.get("/todo", loggedInUserOnly, async (req, res) => {
  const item = await todoItems.find({
    userId: new mongoose.Types.ObjectId(req.user._id),
  });
  res.render("todo", (todoItem = item));
});

app.post("/todo", loggedInUserOnly, async (req, res) => {
  const todoItem = req.body.inputValue;
  const item = new todoItems({
    todo: todoItem,
    userId: req.user._id,
  });
  const data = await item.save();
  res.render("/todo");
});

app.use("/", signinRoute);
app.use("/", loginRoute);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
