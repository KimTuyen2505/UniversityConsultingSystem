const express = require("express");
const postsController = require("../controllers/postsController");
const router = express.Router();

router.get("/posts", postsController.getAll);
router.post("/posts", postsController.addPosts);
router.put("/update-posts", postsController.updatePosts);
router.put("/delete-posts", postsController.deletePosts);
router.put("/comment-posts", postsController.addComment);

module.exports = router;
