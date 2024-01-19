const mongoose = require("mongoose");

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
