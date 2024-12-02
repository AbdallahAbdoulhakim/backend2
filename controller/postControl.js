const postModel = require("../models/postModel");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    const newPost = await (
      await postModel.create(body)
    ).populate("author categories");

    const formattedPost = {
      id: newPost._id,
      title: newPost.title,
      body: newPost.body,
      author: {
        id: newPost.author._id,
        firstname: newPost.author.firstname,
        lastname: newPost.author.lastname,
        imageUrl: newPost.author.imageUrl,
      },
      categories: newPost.categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })),
      imgUrls: newPost.imgUrls,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: formattedPost,
      message: "Post created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const updatePost = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updatedPost = await (
      await postModel.findByIdAndUpdate(id, body, { new: true })
    ).populate("author categories");

    const formattedPost = {
      id: updatedPost._id,
      title: updatedPost.title,
      body: updatedPost.body,
      author: {
        id: updatedPost.author._id,
        firstname: updatedPost.author.firstname,
        lastname: updatedPost.author.lastname,
        imageUrl: updatedPost.author.imageUrl,
      },
      categories: updatedPost.categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })),
      imgUrls: updatedPost.imgUrls,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: formattedPost,
      message: "Post updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deletePost = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedPost = await (
      await postModel.findByIdAndDelete(id)
    ).populate("author categories");

    const formattedPost = {
      id: deletedPost._id,
      title: deletedPost.title,
      body: deletedPost.body,
      author: {
        id: deletedPost.author._id,
        firstname: deletedPost.author.firstname,
        lastname: deletedPost.author.lastname,
        imageUrl: deletedPost.author.imageUrl,
      },
      categories: deletedPost.categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })),
      imgUrls: deletedPost.imgUrls,
      createdAt: deletedPost.createdAt,
      updatedAt: deletedPost.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: formattedPost,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getPosts = asyncHandler(async (req, res, next) => {
  const postsLabels = {
    totalDocs: "postCount",
    docs: "postsList",
    totalPages: "pageCount",
  };

  try {
    const queryParams = req.query;

    const query = queryParams?.search
      ? {
          $or: [
            { title: { $regex: queryParams.search, $options: "i" } },
            { body: { $regex: queryParams.search, $options: "i" } },
          ],
        }
      : {};

    const options = {
      limit: queryParams?.limit
        ? queryParams.limit <= 10
          ? queryParams.limit
          : 10
        : 5,
      offset: queryParams?.offset ? queryParams.offset : 0,
      customLabels: postsLabels,
      sort: { createdAt: -1 },
      populate: "author categories",
    };

    const queryPosts = await postModel.paginate(query, options);

    const postsList = queryPosts.postsList.map((post) => ({
      id: post._id,
      title: post.title,
      body: post.body,
      author: {
        id: post.author._id,
        firstname: post.author.firstname,
        lastname: post.author.lastname,
        imageUrl: post.author.imageUrl,
      },
      categories: post.categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })),
      imgUrls: post.imgUrls,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: { ...queryPosts, postsList: postsList },
      message: "Posts retrieved succesfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getPost = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const retrievedPost = await (
      await postModel.findById(id)
    ).populate("author categories");

    const formattedPost = {
      id: retrievedPost._id,
      title: retrievedPost.title,
      body: retrievedPost.body,
      author: {
        id: retrievedPost.author._id,
        firstname: retrievedPost.author.firstname,
        lastname: retrievedPost.author.lastname,
        imageUrl: retrievedPost.author.imageUrl,
      },
      categories: retrievedPost.categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })),
      createdAt: retrievedPost.createdAt,
      updatedAt: retrievedPost.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: formattedPost,
      message: "Post retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { createPost, updatePost, deletePost, getPosts, getPost };
