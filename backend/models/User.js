const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = model("User", userSchema);