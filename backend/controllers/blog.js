// const { blogs } = require("../models");
const { Blogs } = require("../models");
require("dotenv").config();
const fs = require("fs");

exports.create = (req, res, next) => {
  // TODO Add condition to check for present of file to create Post with or w/o media same as what was done in Project 6.
  // FIXME Create a media a URL if there is a file same as what was done in Project 6.
  const url = req.protocol + "://" + req.get("host");
  const blog = JSON.parse(req.body.blog);
  const blogs = new Blogs({
    title: blog.title,
    body: blog.body,
    author: blog.author,
    mediaUrl: url + "/media/" + req.file.filename,
  });
  blogs
    .save()
    .then(() => {
      res.status(201).json({
        message: "Blog added successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getAllBlogs = (req, res, next) => {
  Blogs.findAll()
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
      console.log("No blog found ...", error);
    });
};
