const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  JournalText: {
    type: String,
    default: "",
  },
  Mood: {
    type: String,
    default: "no mood",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Journal", JournalSchema);
