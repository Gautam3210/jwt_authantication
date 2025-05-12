const express = require("express");
const { v4 } = require("uuid");
const uuidv4 = v4;
const userSchema = require("../module/user_db");
const { mappingSet } = require("../service/mappingUid");

const loginRoute = express.Router();

loginRoute.get("/login", (req, res) => {
  res.render("logIn");
});

loginRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email, password });

  if (!user) {
    res.redirect("/signup");
  } else {
   
    const token = mappingSet(user);
    res.cookie("uid", token);
    res.render("home", (userInfo = user));
  }
});

module.exports = {
  loginRoute,
};
