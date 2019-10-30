const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tournamentSchema = new Schema(
  {
    tournament: {
      type: String,
      require: [true, "Tournament must have a name."],
      unique: true
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
    competitors: [
      {
        userId: {
          type: ObjectId,
          ref: "User"
        },
        firstName: String
      }
    ],
    location: {
      type: String,
      required: [true, "Tournament must have a category."]
    },
    enrollmentFee: {
      type: Number,
      default: 0
    },
    description: String,
    maxNumberOfParticipants: {
      type: Number,
      min: 8,
      default: 8
    },
    fullCompetitors: {
      type: Boolean,
      default: false
    },
    enrolled: {
      type: Boolean,
      default: false
    },
    pricePool: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date,
      required: [true, "Tournament must have a start date"]
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
