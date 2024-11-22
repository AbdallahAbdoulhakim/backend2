const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await userModel.create(body);

    res.status(201).json({
      success: true,
      data: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        mobile: newUser.mobile,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        imageUrl: newUser.imageUrl,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.json({
      success: true,
      data: {
        id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        imageUrl: updatedUser.imageUrl,
      },
      message: "User updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    res.json({
      success: true,
      data: {
        id: deletedUser._id,
        firstname: deletedUser.firstname,
        lastname: deletedUser.lastname,
        email: deletedUser.email,
        mobile: deletedUser.mobile,
        createdAt: deletedUser.createdAt,
        updatedAt: deletedUser.updatedAt,
        imageUrl: deletedUser.imageUrl,
      },
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const fetchUser = await userModel.findById(id);

    res.status(200).json({
      success: true,
      data: {
        id: fetchUser._id,
        firstname: fetchUser.firstname,
        lastname: fetchUser.lastname,
        email: fetchUser.email,
        mobile: fetchUser.mobile,
        createdAt: fetchUser.createdAt,
        updatedAt: fetchUser.updatedAt,
        imageUrl: fetchUser.imageUrl,
      },
      message: "User retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      success: true,
      data: users.map((user) => ({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        mobile: user.mobile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      message: "Users retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { createUser, getUser, getUsers, updateUser, deleteUser };
