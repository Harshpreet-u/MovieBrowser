const { required } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // favorites: [
  //   {
  //     id: Number,
  //     title: String,
  //     poster_path: String,
  //     release_date: String,
  //   },
  // ],

  // watchLater: [
  //   {
  //     id: Number,
  //     title: String,
  //     poster_path: String,
  //     release_date: String,
  //   },
  // ],
  // watchList: [
  //   {
  //     id: Number,
  //     title: String,
  //     poster_path: String,
  //     release_date: String,
  //   },
  // ],
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
