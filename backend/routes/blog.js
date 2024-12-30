const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const blogController = require("../controllers/blog");

// FIXME ADD Auth middleware
// router.get("/", blogController.getAllBlogs);
router.get("/", auth, blogController.getAllBlogs);
router.post("/", auth, multer, blogController.create);
// router.post("/", auth, multer, blogController.create);


module.exports = router;
