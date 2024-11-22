const asyncHandler = require("express-async-handler");
const postModel = require("../models/categoryModel");
const categoryModel = require("../models/categoryModel");

const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const newCategory = await postModel.create(body);

    res.status(201).json({
      success: true,
      data: {
        id: newCategory._id,
        title: newCategory.title,
        createdAt: newCategory.createdAt,
        updatedAt: newCategory.updatedAt,
      },
      message: "Category created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const updateCategory = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: {
        id: updatedCategory._id,
        title: updatedCategory.title,
        createdAt: updatedCategory.createdAt,
        updatedAt: updatedCategory.updatedAt,
      },
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: {
        id: deletedCategory._id,
        title: deletedCategory.title,
        createdAt: deletedCategory.createdAt,
        updatedAt: deletedCategory.updatedAt,
      },
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

const getCategory = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const category = await categoryModel.findById(id);

    res.status(200).json({
      success: true,
      data: {
        id: category._id,
        title: category.title,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
      message: "Category retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      success: true,
      data: categories.map((cat) => ({
        id: cat._id,
        title: cat.title,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      })),
      message: "Categories retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  getCategories,
};
