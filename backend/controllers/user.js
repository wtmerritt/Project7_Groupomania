const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/");
require("dotenv").config();

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      fullName: req.body.fullName,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })

    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password"),
            });
          }
          const token = jwt.sign(
            { userId: user.id },
            process.env.SECRET_TOKEN,
            {
              expiresIn: "24h",
            }
          );

          res.status(200).json({
            userId: user.id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.deleteAccount = (req, res, next) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Account Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
