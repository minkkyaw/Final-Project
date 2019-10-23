const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tournamentSchema = new Schema(
  {
    tournamentName: {
      type: String,
      require: [true, "Tournament must have a name."]
    },
    category: {
      type: String,
      required: [true, "Tournament must have a category."]
    },
    user: {
      _id: {
        type: ObjectId,
        ref: "User"
      },
      firstName: String,
      photoUrl: String
    },
    competitors: [ObjectId],
    location: String,
    zipCode: Number,
    noOfLike: {
      type: Number,
      default: 0
    },
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

tournamentSchema.index({ createdAt: 1 });
tournamentSchema.index({ "$**": "text" });

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
