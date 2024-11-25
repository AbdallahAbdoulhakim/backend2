const menuItemModel = require("../models/menuItemModel");

const asyncHandler = require("express-async-handler");
const { formattedMenu } = require("../utils/utils");

const createMenuItem = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const newMenuItem = await menuItemModel.create(body);

    res.status(201).json({
      success: true,
      data: {
        id: newMenuItem._id,
        title: newMenuItem.title,
        parent: newMenuItem.parent,
        createdAt: newMenuItem.createdAt,
        updatedAt: newMenuItem.updatedAt,
      },
      message: "Menu Item created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const updateMenuItem = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedMenuItem = await menuItemModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedMenuItem) {
      res.status(404);
      throw new Error("Error 404: Menu Item does not exist");
    }

    res.status(200).json({
      success: true,
      data: {
        id: updatedMenuItem._id,
        title: updatedMenuItem.title,
        parent: updatedMenuItem.parent,
        createdAt: updatedMenuItem.createdAt,
        updatedAt: updatedMenuItem.updatedAt,
      },
      message: "Menu Item updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteMenuItem = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedMenuItem = await menuItemModel.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      res.status(404);
      throw new Error("Error 404: Menu Item does not exist");
    }

    res.status(200).json({
      success: true,
      data: {
        id: deletedMenuItem._id,
        title: deletedMenuItem.title,
        parent: deletedMenuItem.parent,
        createdAt: deletedMenuItem.createdAt,
        updatedAt: deletedMenuItem.updatedAt,
      },
      message: "Menu Item deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getMenuItem = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const retrievedMenuItem = await menuItemModel.findById(id);

    if (!retrievedMenuItem) {
      res.status(404);
      throw new Error("Error 404: Menu Item does not exist");
    }

    res.status(200).json({
      success: true,
      data: retrievedMenuItem,
      message: "Menu item retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getAllMenuItems = asyncHandler(async (req, res, next) => {
  try {
    const menuItems = await menuItemModel.find();

    formattedMenu(menuItems);

    res.status(200).json({
      success: true,
      data: menuItems.map((menuItem) => ({
        id: menuItem._id,
        title: menuItem.title,
        parent: menuItem.parent,
        createdAt: menuItem.createdAt,
        updatedAt: menuItem.updatedAt,
      })),
      message: "Menu items retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItem,
  getAllMenuItems,
};
