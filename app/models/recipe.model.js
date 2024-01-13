// Importing mongoose:
const mongoose = require("mongoose");

// Creating recipeSchema
const recipeSchema = mongoose.Schema({
  name: { type: String, required: true },
  origine: { type: Number, ref: 'OrigineModel' }, // Reference the custom ID field
  // origine: { type: mongoose.Schema.Types.ObjectId, ref: 'OrigineModel' }, // Reference the custom ID field
  ingredients: [
    { type: String, required: true }
  ],
  description: { type: String, required: true },
  published: Boolean,
  // popularite: ,
  // image: ,
},
  { timestamps: true }
);

/* 
  schema.method("toJSON", function() { ... }):

This line adds a custom method named toJSON to the Mongoose schema. The method is defined as an anonymous function.
const { __v, _id, ...object } = this.toObject();:

This line uses object destructuring to create a new object named object that excludes the __v and _id fields. The __v field is a version key added by Mongoose, and _id is the default MongoDB unique identifier.
object.id = _id;:

This line adds a new property named id to the object and assigns the value of _id to it. This is done to rename the unique identifier from _id to id.
return object;:

The method returns the modified object, which will be the result of calling toJSON on a Mongoose document.
In summary, this custom toJSON method is overriding the default behavior of Mongoose when converting documents to JSON. It removes the __v field, renames the _id field to id, and returns the modified object. This can be useful, especially when you want to format the JSON representation of your documents in a specific way, such as aligning with frontend expectations or excluding certain fields.
*/
/* 
  In summary, this custom toJSON method is overriding the default behavior of Mongoose when converting documents to JSON. 
  It removes the __v field, renames the _id field to id, and returns the modified object. 
  This can be useful, especially when you want to format the JSON representation of your documents in a specific way, such as aligning with frontend expectations or excluding certain fields.
*/
// Nb: If you use this app with a front-end that needs id field instead of _id, you have to override toJSON method that map default object to a custom object. So the Mongoose model could be modified as following code:
recipeSchema.method("toJSON", function () {
  // destructuring to create a new object named object that excludes the __v and _id fields. The __v field is a version key added by Mongoose, and _id is the default MongoDB unique identifier.
  const { __v, _id, ...object } = this.toObject();
  // adds a new property named id to the object and assigns the value of _id to it. This is done to rename the unique identifier from _id to id.
  object.id = _id;
  return object;
  // Nb: The method returns the modified object, which will be the result of calling toJSON on a Mongoose document.
})

// Exporting module
module.exports = mongoose => {

  // Création du Model pour les tutorials
  const RecipeModel = mongoose.model("recipe", recipeSchema);
  return RecipeModel;
};