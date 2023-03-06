const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("welcome");
});
router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/schedule", (req, res) => {
  res.render("schedule");
});
router.get("/services", (req, res) => {
  res.render("services");
});
router.get("/contact", (req, res) => {
  res.render("contact");
});
// router.post("/scheduling", (req, res) => {
//   res.send(" Your Slot is Booked");
// });

module.exports = router;
