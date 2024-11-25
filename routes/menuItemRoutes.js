const router = require("express").Router();
const {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
} = require("../controller/menuItemControl");

router.post("/create", createMenuItem);
router.put("/:id/update", updateMenuItem);
router.delete("/:id/delete", deleteMenuItem);
router.get("/all", getAllMenuItems);

module.exports = router;
