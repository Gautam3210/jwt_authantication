const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/authentication").then((res) => {
  if (res) {
    console.log("db connected");
  }
});


