// const { blogs } = require("../models");
const { Console } = require("console");
const { blog } = require("../models");
const { Blogs } = require("../models");
require("dotenv").config();
const fs = require("fs");

exports.create = (req, res, next) => {
  if (req.body.media) {
    console.log("req file data = " + JSON.stringify(req.body.blog));
    var str = req.body.media;
    console.log("media req = " + JSON.stringify(req.body.media));
    var parts = str.split("\\");
    var right = parts[2];
    console.log("right = " + right);

    const url = req.protocol + "://" + req.get("host");
    const blog = JSON.parse(req.body.blog);
    const blogs = new Blogs({
      title: blog.title,
      body: blog.body,
      author: blog.author,
      // mediaUrl: url + "/media/" + req.file.filename,
      mediaUrl: url + "/media/" + right,
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
  } else {
    console.log("file is empty ");
    console.log("blog = " + JSON.stringify(req.body));

    const blogTitle = JSON.stringify(req.body.title);
    const blogBody = JSON.stringify(req.body.body);
    const blogAuthor = JSON.stringify(req.body.author);
    
    const url = req.protocol + "://" + req.get("host");

    const blogs = new Blogs({
      title: blogTitle,
      body: blogBody,
      author: blogAuthor,
      mediaUrl: "",
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
  }
};

exports.getOneBlog = (req, res, next) => {
  console.log("Inside function getOne Blog");
  Blogs.findOne({
    id: req.params.id,
  })
    .then((blog) => {
      console.log("id req = " + req.params.id);
      
      res.status(200).json(blog);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};


exports.getAllBlogs = (req, res, next) => {
  console.log("Inside function get All Blogs");
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


