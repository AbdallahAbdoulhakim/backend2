const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
} = require("../controller/postControl");
const router = require("express").Router();

router.get("/all", getPosts);
router.get("/:id", getPost);
router.post("/create", createPost);
router.put("/:id/update", updatePost);
router.delete("/:id/delete", deletePost);

module.exports = router;
