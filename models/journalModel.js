const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  JournalText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Journal", JournalSchema);
