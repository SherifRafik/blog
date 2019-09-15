const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const port = process.env.port || 5000;

app.get("/", function (req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
  res.send("You've been redirected to the /blogs routes");
});

app.listen(port, function () {
  console.log("Server has started on port " + port);
});