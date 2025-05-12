const mongoose = require("mongoose");
require("./db");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});


module.exports = mongoose.model('todoItems', todoSchema);