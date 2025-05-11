const cookieParser = require("cookie-parser");
const express = require("express");
const { loginRoute } = require("./routes/loginRoute");
const { signinRoute } = require("./routes/signupRoute");
const { mappingGet } = require("./service/mappingUid");

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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/todo", loggedInUserOnly, (req, res) => {
  res.render("todo");
});

app.use("/", signinRoute);
app.use("/", loginRoute);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
