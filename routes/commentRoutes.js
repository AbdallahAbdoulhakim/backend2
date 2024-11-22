const { createComment } = require("../controller/commentControl");
const router = require("express").Router();

router.post("/:id/create", createComment);

module.exports = router;
