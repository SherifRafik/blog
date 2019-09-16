const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");


router.get("/", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err)
      console.log(err);
    else
      res.render("index", {
        blogs: blogs
      });
  });
});

router.get("/new", function (req, res) {
  res.render("new");
});

router.post("/", function (req, res) {
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err)
      console.log(err);
    else
      res.redirect("/blogs");
  });
});

router.get("/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err)
      console.log(err);
    else
      res.render("show", {
        blog: blog
      });
  });
});

router.get("/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err)
      console.log(err + "Here");
    else
      res.render("edit", {
        blog: blog
      });
  });
});

router.put("/:id", function (req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
    if (err)
      console.log(err);
    else
      res.redirect("/blogs/" + req.params.id);
  });
});

router.delete("/:id", function (req, res) {
  Blog.findByIdAndDelete(req.params.id, function (err, deletedBlog) {
    if (err)
      console.log(err);
    else
      res.redirect("/blogs");
  });
});


module.exports = router;