const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  post: {
    type: String,
    require: [true, "Post must have a content."]
  },
  user: {
    _id: {
      type: ObjectId,
      ref: "User"
    },
    username: String,
    photoUrl: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
