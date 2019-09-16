const express = require("express");
const router = express.Router();

router.get("/about-us", function (req, res) {
  res.render("about-us");
});

module.exports = router;