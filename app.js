const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = process.env.port || 5000;

const Blog = require("./models/blog");

// Express config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride("_method"));


mongoose.connect("mongodb://localhost/blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// ROUTES
app.get("/", function (req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err)
      console.log("Error retreiving data from db");
    else
      res.render("index", {
        blogs: blogs
      });
  });
});

app.get("/blogs/new", function (req, res) {
  res.render("new");
});

app.post("/blogs", function (req, res) {
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err)
      console.log("Error creating a new instance in the database");
    else
      res.redirect("/blogs");
  });
});

app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err)
      console.log("Error finding the instance in the database");
    else
      res.render("show", {
        blog: blog
      });
  });
});

app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err)
      console.log("Error finding the instance in the database");
    else
      res.render("edit", {
        blog: blog
      });
  });
});

app.put("/blogs/:id", function (req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
    if (err)
      console.log("Error updating this blog");
    else
      res.redirect("/blogs" + req.params.id);
  });
});

app.delete("/blogs/:id", function (req, res) {
  Blog.findByIdAndDelete(req.params.id, function (err, deletedBlog) {
    if (err)
      console.log("Error deleting the blog");
    else
      res.redirect("/blogs");
  });
});

app.get("/about-us", function (req, res) {
  res.render("about-us");
});

app.listen(port, function () {
  console.log("Server has started on port " + port);
});