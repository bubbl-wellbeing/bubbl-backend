const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  JournalText: {
    type: String,
    default: "",
  },
  Mood: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Journal", JournalSchema);
