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
// router.post("/:id/like", auth, multer, sauceController.likeSauce);
router.get("/:id", auth, blogController.getOneBlog);
// router.put("/:id", auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, blogController.deleteBlog);

module.exports = router;
