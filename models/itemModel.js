const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId,

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: [true, "Item must have a name"]
  },
  price: {
    type: Number,
    required: [true, "Item must have a price"]
  },
  user: {
    _id: {
      type: ObjectId,
      ref: "User"
    },
    name: String,
    photoUrl: String
  },
  photoUrl: String
});