const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.params.id;

    const retrievedPost = await postModel.findById(postId);

    if (!retrievedPost) {
      res.status(404);
      throw new Error("Error 404 : Post not Found!");
    }
    res.status(200).json({ success: true, data: retrievedPost });
  } catch (error) {
    next(error);
  }
});

module.exports = { createComment };
