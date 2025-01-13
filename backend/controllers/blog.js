// const { blogs } = require("../models");
const { Console } = require("console");
const { blog } = require("../models/");
const { Blogs } = require("../models/");
require("dotenv").config();
const fs = require("fs");

exports.create = (req, res, next) => {
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const blog = JSON.parse(req.body.blog);
    const blogs = new Blogs({
      title: blog.title,
      body: blog.body,
      userId: blog.userId,
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
  } else {
    console.log("file is empty ");
    console.log("blog = " + JSON.stringify(req.body));

    const blog = req.body;

    const blogs = new Blogs({
      title: blog.title,
      body: blog.body,
      userId: blog.userId,
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
    where: { id: req.params.id },
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

exports.deleteBlog = (req, res, next) => {
  Blogs.findOne({
    where: { id: req.params.id },
  }).then((blog) => {
    const filename = blog.mediaUrl.split("/media/")[1];
    fs.unlink("media/" + filename, () => {
      Blogs.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted Blog!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};
