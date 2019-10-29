const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const searchSchema = new Schema({
  search: {
    type: String,
    require: [true, "Post must have a content."]
  },
  userId: {
    type: ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

searchSchema.index({ createdAt: 1 });

const Notification = mongoose.model("Notification", searchSchema);

module.exports = Notification;
