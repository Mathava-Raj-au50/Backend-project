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

const scheduleSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  slots: String,
});

const Slots = new mongoose.model("schedule_collection", scheduleSchema);

app.listen(6000, () => {
  console.log("Listening to MongoDB on port 5000");
});

module.exports = Slots;
