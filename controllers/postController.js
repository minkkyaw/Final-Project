const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const Post = require("./../models/postModel");
const factory = require("./handlerFactory");

exports.addedUser = (req, res, next) => {
  if (req.user) {
    req.body.user = { _id: req.user._id, name: req.user.name };
  }
  next();
};

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
