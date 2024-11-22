const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/userControl");

const router = require("express").Router();

router.post("/register", createUser);
router.put("/:id/update", updateUser);
router.delete("/:id/delete", deleteUser);

router.get("/all", getUsers);
router.get("/:id", getUser);

module.exports = router;
