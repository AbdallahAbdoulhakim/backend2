const router = require("express").Router();

const {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  getCategories,
} = require("../controller/categoryControl");

router.post("/create", createCategory);
router.get("/all", getCategories);

router.put("/:id/update", updateCategory);
router.delete("/:id/delete", deleteCategory);

router.get("/:id", getCategory);

module.exports = router;
