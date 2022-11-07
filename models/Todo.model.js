const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  TaskName: { type: String, required: true },
  Status: { type: String, required: true },
  Tag: { type: String, required: true },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };

// taskname - Take haircut,
// status - pending,
// tag - personal
