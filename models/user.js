const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  passowrd: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  streetAddress: {
    type: [String],
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  interest: {
    type: [String],
    required: true
  },
  age: {
    type: Number
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
