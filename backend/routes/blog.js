const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const blogController = require("../controllers/blog");


router.get("/", auth, blogController.getAllBlogs);
router.post("/", auth, multer, blogController.create);
router.get("/:id", auth, blogController.getOneBlog);
router.post("/:id/read", auth, blogController.read);

module.exports = router;
