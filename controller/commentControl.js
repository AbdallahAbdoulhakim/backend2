const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const createComment = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.params.id;
    const body = req.body;

    const retrievedPost = await postModel.findById(postId);
    const author = await userModel.findById(body?.author);

    if (!retrievedPost) {
      res.status(404);
      throw new Error("Error 404 : Post not Found!");
    }

    if (!author) {
      res.status(404);
      throw new Error("Error 404 : User not Found!");
    }

    const newComment = await (
      await commentModel.create({ ...body, post: retrievedPost })
    ).populate("author post");

    const comment = {
      id: newComment._id,
      body: newComment.body,
      author: {
        id: newComment.author._id,
        firstname: newComment.author.firstname,
        lastname: newComment.author.lastname,
        imageUrl: newComment.author.imageUrl,
      },
      post: {
        id: newComment.post._id,
        title: newComment.post.title,
      },
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: comment,
      message: "Comment created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const updateComment = asyncHandler(async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const body = req.body;

    const retrievedComment = await commentModel.findById(commentId);

    if (!retrievedComment) {
      res.status(404);
      throw new Error("Error 404 : Comment not Found!");
    }

    const updatedComment = await (
      await commentModel.findByIdAndUpdate(commentId, body, { new: true })
    ).populate("author post");

    const comment = {
      id: updatedComment._id,
      body: updatedComment.body,
      author: {
        id: updatedComment.author._id,
        firstname: updatedComment.author.firstname,
        lastname: updatedComment.author.lastname,
        imageUrl: updatedComment.author.imageUrl,
      },
      post: {
        id: updatedComment.post._id,
        title: updatedComment.post.title,
      },
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: comment,
      message: "Comment updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const retrievedComment = await commentModel.findById(commentId);

    if (!retrievedComment) {
      res.status(404);
      throw new Error("Error 404 : Comment not Found!");
    }

    const deletedComment = await (
      await commentModel.findByIdAndDelete(commentId)
    ).populate("author post");

    const comment = {
      id: deletedComment._id,
      body: deletedComment.body,
      author: {
        id: deletedComment.author._id,
        firstname: deletedComment.author.firstname,
        lastname: deletedComment.author.lastname,
        imageUrl: deletedComment.author.imageUrl,
      },
      post: {
        id: deletedComment.post._id,
        title: deletedComment.post.title,
      },
      createdAt: deletedComment.createdAt,
      updatedAt: deletedComment.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: comment,
      message: "Comment deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getComment = asyncHandler(async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const retrievedComment = await (
      await commentModel.findById(commentId)
    ).populate("author post");

    if (!retrievedComment) {
      res.status(404);
      throw new Error("Error 404 : Comment not Found!");
    }

    const comment = {
      id: retrievedComment._id,
      body: retrievedComment.body,
      author: {
        id: retrievedComment.author._id,
        firstname: retrievedComment.author.firstname,
        lastname: retrievedComment.author.lastname,
        imageUrl: retrievedComment.author.imageUrl,
      },
      post: {
        id: retrievedComment.post._id,
        title: retrievedComment.post.title,
      },
      createdAt: retrievedComment.createdAt,
      updatedAt: retrievedComment.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: comment,
      message: "Comment retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getCommentsByPost = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      res.status(404);
      throw new Error("Error 404 : Post Not Found!");
    }

    const commentsList = await commentModel.find().populate("author");
    const comments = commentsList.map((comment) => ({
      id: comment.id,
      body: comment.body,
      author: {
        id: comment.author._id,
        firstname: comment.author.firstname,
        lastname: comment.author.lastname,
        imageUrl: comment.author.imageUrl,
      },
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: comments,
      message: "Comments retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getCommentsByPost,
};
