const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
} = require("../controller/postControl");

const { getCommentsByPost } = require("../controller/commentControl");
const router = require("express").Router();

router.get("/all", getPosts);
router.get("/:id/comments", getCommentsByPost);
router.get("/:id", getPost);
router.post("/create", createPost);
router.put("/:id/update", updatePost);
router.delete("/:id/delete", deletePost);

module.exports = router;
