const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
      type: String,
      min: 8,
      required: true,
      select: false
    },
    confirmPassword: {
      type: String,
      min: 8,
      required: true,
      validate: {
        validator: function(val) {
          return this.password === val;
        },
        message: "Passwords are not the same"
      }
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    },
    interest: {
      type: String
    },
    skills: [
      {
        skillName: {
          type: String,
          required: [true, "Please add the skill name!"]
        },
        rating: {
          type: Number,
          default: 30
        }
      }
    ],
    photoUrl: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.index({ createdAt: 1 });
userSchema.index({ "$**": "text" });

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user._id",
  localField: "_id"
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.comparePasswords = async function(
  currentPassword,
  newPassword
) {
  return await bcrypt.compare(currentPassword, newPassword);
};

userSchema.methods.changedPasswordCheck = function(JwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
