const menuItemModel = require("../models/menuItemModel");

const asyncHandler = require("express-async-handler");
const { formattedMenu } = require("../utils/utils");

const createMenuItem = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const newMenuItem = await (
      await menuItemModel.create(body)
    ).populate({ path: "children" });

    res.status(201).json({
      success: true,
      data: {
        id: newMenuItem._id,
        title: newMenuItem.title,
        link: newMenuItem.link,
        parent: newMenuItem.parent,
        createdAt: newMenuItem.createdAt,
        updatedAt: newMenuItem.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

const updateMenuItem = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedMenuItem = await (
      await menuItemModel.findByIdAndUpdate(id, body, {
        new: true,
      })
    ).populate({ path: "children" });

    if (!updatedMenuItem) {
      res.status(404);
      throw new Error("Error 404: Menu Item does not exist");
    }

    res.status(200).json({
      success: true,
      data: {
        id: updatedMenuItem._id,
        title: updatedMenuItem.title,
        link: updatedMenuItem.link,
        parent: updatedMenuItem.parent,
        children: updatedMenuItem.children,
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

    const deletedMenuItem = await (
      await menuItemModel.findByIdAndDelete(id)
    ).populate({ path: "children" });

    if (!deletedMenuItem) {
      res.status(404);
      throw new Error("Error 404: Menu Item does not exist");
    }

    res.status(200).json({
      success: true,
      data: {
        id: deletedMenuItem._id,
        title: deletedMenuItem.title,
        link: deletedMenuItem.link,
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

    const retrievedMenuItem = await (
      await menuItemModel.findById(id)
    ).populate({
      path: "children",
      populate: { path: "children", populate: { path: "children" } },
    });

    if (!retrievedMenuItem) {
      res.status(404);
      throw new Error("Error 404: Menu Item does not exist");
    }

    res.status(200).json({
      success: true,
      data: {
        id: retrievedMenuItem._id,
        title: retrievedMenuItem.title,
        link: retrievedMenuItem.link,
        parent: retrievedMenuItem.parent,
        children: retrievedMenuItem?.children
          ? retrievedMenuItem.children
          : null,
        createdAt: retrievedMenuItem.createdAt,
        updatedAt: retrievedMenuItem.updatedAt,
      },
      message: "Menu item retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getAllMenuItems = asyncHandler(async (req, res, next) => {
  try {
    const menuItems = await menuItemModel.find().populate({
      path: "children",
      populate: { path: "children", populate: { path: "children" } },
    });

    res.status(200).json({
      success: true,
      data: menuItems.filter((item) => !item.parent),
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
