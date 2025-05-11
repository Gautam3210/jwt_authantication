const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("./module/db_config");

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signUp");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);
  const user = new userSchema({
    name,
    email,
    password,
  });
  const data = await user.save();
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("logIn");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userSchema.find({ email, password });

  if (user.length === 0) {
    res.redirect("/signup");
  } else {
    res.redirect("/");
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
