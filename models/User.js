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
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);

// moment utc 2020-09-06T15:32:37.000+00:00
// Date.now() 2020-09-06T15:36:56.565+00:00
