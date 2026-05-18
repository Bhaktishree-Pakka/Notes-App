const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Notes",notesSchema);