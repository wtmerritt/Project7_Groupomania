const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const blogController = require("../controllers/blog");

router.get("/blog", blogController.getAllBlogs);
router.post("/create", multer, blogController.create);
// router.post("/create", auth, multer, blogController.create);


module.exports = router;
