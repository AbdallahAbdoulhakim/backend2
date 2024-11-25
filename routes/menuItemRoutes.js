const router = require("express").Router();
const {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuItem,
} = require("../controller/menuItemControl");

router.post("/create", createMenuItem);
router.put("/:id/update", updateMenuItem);
router.delete("/:id/delete", deleteMenuItem);
router.get("/all", getAllMenuItems);
router.get("/:id", getMenuItem);

module.exports = router;
