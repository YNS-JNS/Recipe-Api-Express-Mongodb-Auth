const mongoose = require("mongoose");

// Origine === Category
const origineSchema = mongoose.Schema({
  origineId: {
    type: Number,
    required: [true, 'origineId is required!'],
    trim: true,
    unique: true
  },
  country: {
    type: String,
    required: [true, 'country name is required!'],
    trim: true,
  },
  // image: ,
},
  { timestamps: true }
);

origineSchema.method("toJSON", function () {

  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
})

module.exports = mongoose => {
  const OrigineModel = mongoose.model("origine", origineSchema)
  return OrigineModel;
}
