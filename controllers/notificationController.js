const Notification = require("./../models/notificationModel");
const factory = require("./handlerFactory");

exports.addedUserPostIds = (req, res, next) => {
  req.body.postId = req.params.postId;
  req.body.userId = req.params.userId;
  next();
};

exports.addedUser = (req, res, next) => {
  req.body.userId = req.user._id;
  next();
};

exports.getAllNotifications = factory.getAll(Notification, null, "createdAt");
exports.getNotification = factory.getOne(Notification);
exports.createNotification = factory.createOne(Notification);
exports.updateNotification = factory.updateOne(Notification);
exports.deleteNotification = factory.deleteOne(Notification);
