const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./database1");
const Slots = require("./scheduledatabase");
const cookieParser = require("cookie-parser");
const { urlencoded } = require("express");
const verifyToken = require("./verifyToken");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");

const expressLayouts = require("express-ejs-layouts");

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//routes
app.use("/", require("./routes/index"));

app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/home", verifyToken, (req, res) => {
  res.render("home", (err) => {
    if (err) {
      console.log("Error while loading home page", err);
    }
  });
});

app.post("/userLogin", async (req, res) => {
  const data = req.body;
  let user_password = data.password;
  let user_email = data.email;
  const user_data = await User.findOne({ email: user_email });
  if (!user_data) {
    res.status(400);
    res.send("User doesn't exist");
  }
  //matching password
  let db_password = user_data.password;

  const isValid = await bcrypt.compare(user_password.toString(), db_password);

  if (!isValid) {
    res.status(400);
    return res.send("Incorrect Password");
  }

  //generate token
  const token_to_send = jwt.sign({ id: user_data._id }, "mySecretKey", {
    expiresIn: "1hr",
  });
  res.cookie("my_token", token_to_send);
  return res.render("home");
});

app.post("/userSignup", async (req, res) => {
  const data = req.body;
  if (data.password !== data.cpassword) {
    return res.send("Incorrect Password");
  }
  let user_name = data.name;
  let user_email = data.email;
  let user_password = data.password;
  if (!user_name || !user_email || !user_password) {
    res.status(400);
    return res.send("Fields are empty");
  }
  const user_data = await User.findOne({ email: user_email });
  if (user_data) {
    res.status(400);
    return res.send("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  let hashed_password = await bcrypt.hash(user_password.toString(), salt);
  // hashed_password = hashed_password.toString()
  const data_to_store = new User({
    name: user_name,
    email: user_email,
    password: hashed_password,
  });
  const result = await data_to_store.save();
  res.redirect("/login");
});

// app.post("/add", verifyToken, (req, res) => {
//   res.redirect("/home");
// });

app.post("/scheduling", (req, res) => {
  // save in db
  const slot = new Slots({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    slots: req.body.slots,
  });
  slot.save();

  Slots.find({}, () => {
    res.render("services", {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      slots: req.body.slots,
    });
  });
});
app.post("/logout", (req, res) => {
  res.clearCookie("my_token");
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("The server is live");
});
