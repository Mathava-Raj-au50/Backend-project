const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mathavaraj:muma2001@cluster0.hw8zqo3.mongodb.net/backend_project?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Connection Failed", err);
    } else {
      console.log("Connection Success");
    }
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("user_collection", userSchema);

app.listen(5000, () => {
  console.log("Listening to MongoDB on port 5000");
});

module.exports = User;
