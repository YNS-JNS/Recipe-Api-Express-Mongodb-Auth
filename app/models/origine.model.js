const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Origine:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the origine.
 *         origineId:
 *           type: number
 *           description: The unique identifier for the origine (category).
 *         country:
 *           type: string
 *           description: The name of the country associated with the origine.
 *       required:
 *         - origineId
 *         - country
*/

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
  // Todo : I have to add an image  ,
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
