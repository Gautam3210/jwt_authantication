const express = require("express");
const userSchema = require("../module/db_config");

const signinRoute = express.Router();

signinRoute.get("/signup", (req, res) => {
  res.render("signUp");
});

signinRoute.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new userSchema({
    name,
    email,
    password,
  });
  const data = await user.save();
  res.redirect("/login");
});

module.exports = {
  signinRoute,
};
