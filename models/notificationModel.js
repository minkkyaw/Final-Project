const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const notificationSchema = new Schema({
  notification: {
    type: String,
    require: [true, "Post must have a content."]
  },
  userId: {
    type: ObjectId,
    ref: "User"
  },
  postId: {
    type: ObjectId,
    ref: "Post"
  },
  newNoti: {
    type: Boolean,
    default: true
  },
  opened: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

notificationSchema.index({ createdAt: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
