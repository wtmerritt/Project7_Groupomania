const { Console } = require("console");
const { Blogs, User } = require("../models/");
require("dotenv").config();
const fs = require("fs");
const blog = require("../models/blog");
const emptyArray = {};

exports.create = (req, res, next) => {
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const blog = JSON.parse(req.body.blog);
    const blogs = new Blogs({
      title: blog.title,
      body: blog.body,
      UserId: blog.userId,
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
    const blog = req.body;
    const blogs = new Blogs({
      title: blog.title,
      body: blog.body,
      UserId: blog.userId,
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
  
  Blogs.findOne({
    where: { id: req.params.id },
  })

    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllBlogs = (req, res, next) => {
  
  Blogs.findAll({ include: [{ model: User, attributes: ["fullName"] }] })
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

exports.read = (req, res, next) => {
 
  const userId = req.body.userId;

  Blogs.findOne({
    where: { id: req.params.id },
  })
    .then((blog) => {
      if (blog.read[0] !== 1) {
        blog.read = [...blog.read, userId];
        blog
          .save()
          .then(() => {
            res.status(201).json({
              message: "Read Updated successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      } else {
        console.log("Blog is already been read ...");
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
      console.log("No Read made ...", error);
    });
};
