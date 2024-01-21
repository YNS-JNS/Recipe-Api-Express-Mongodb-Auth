const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
*/

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name is required!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
  }
},
  { timestamps: true }
);

// ______________________________________________
userSchema.method("toJSON", function () {

  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
})
// ______________________________________________

module.exports = mongoose => {
  const UserModel = mongoose.model("user", userSchema)
  return UserModel;
};
