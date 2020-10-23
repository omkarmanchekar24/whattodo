const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: moment.utc().toDate(),
  },
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
