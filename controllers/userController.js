const User = require("./../models/userModel");
const factory = require("./handlerFactory");

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.getUserWithPosts = factory.getOne(User, {
  path: "comments posts",
  populate: { path: "comments", options: { sort: { createdAt: -1 } } }
});
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.uploadPhoto = factory.uploadPhoto(User);



