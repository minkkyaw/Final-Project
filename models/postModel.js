const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema(
  {
    post: {
      type: String,
      require: [true, "Post must have a content."]
    },
    user: {
      _id: {
        type: ObjectId,
        ref: "User"
      },
      firstName: String,
      photoUrl: String
    },
    userLiked: {
      type: Boolean,
      default: false
    },
    userIdsLiked: [
      {
        userId: ObjectId,
        name: String
      }
    ],
    participants: [
      {
        userId: ObjectId,
        name: String
      }
    ],
    alreadyParticipated: {
      type: Boolean,
      default: false
    },
    zipCode: Number,
    userlikedIds: [ObjectId],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id"
});

postSchema.index({ createdAt: 1 });
postSchema.index({ "$**": "text" });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
