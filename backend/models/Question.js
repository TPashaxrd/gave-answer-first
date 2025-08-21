const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true }, // doğru şık indexi
}, { timestamps: true });

module.exports = model("Question", questionSchema);
