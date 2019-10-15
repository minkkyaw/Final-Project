const Comment = require("./../models/commentModel");
const factory = require("./handlerFactory");

exports.addedPostIds = (req, res, next) => {
  req.body.postId = req.params.postId;
  next();
};

exports.addedUser = (req, res, next) => {
  req.body.user = { _id: req.user._id, firstName: req.user.firstName };
  next();
};

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
