const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verification_token: {
    type: Number,
    required: true,
  },
  verification_token_time: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: moment.utc().toDate(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);
