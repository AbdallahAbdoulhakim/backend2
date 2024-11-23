const {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} = require("../controller/commentControl");

const router = require("express").Router();

router.get("/:id", getComment);
router.post("/:id/create", createComment);
router.put("/:id/update", updateComment);
router.delete("/:id/delete", deleteComment);

module.exports = router;
