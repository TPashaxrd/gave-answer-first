const { Schema, model, Types } = require("mongoose");

const matchSchema = new Schema({
  players: [{ type: Types.ObjectId, ref: "User" }],
  question: { type: Types.ObjectId, ref: "Question" },
  winner: { type: Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

module.exports = model("Match", matchSchema);