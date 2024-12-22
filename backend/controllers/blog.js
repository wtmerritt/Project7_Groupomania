// const Blogs = require("../models");
const { Blogs } = require("../models");
require("dotenv").config();
const fs = require("fs");


exports.create = (req, res, next) => {
  const blogs = new Blogs({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    file: req.body.file,
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

