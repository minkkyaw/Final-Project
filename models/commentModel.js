const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
  comment: {
    type: String,
    require: [true, "Comment must have a content"]
  },
  user: {
    _id: {
      type: ObjectId,
      ref: "User"
    },
    name: String,
    photoUrl: String
  },
  postId: {
    type: ObjectId,
    ref: "Post"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
