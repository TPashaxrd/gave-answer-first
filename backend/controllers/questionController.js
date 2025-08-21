const Question = require("../models/Question");

// Yeni soru ekle
const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Tüm soruları al
const getAllQuestions = async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
};

// Rastgele soru çek
const getRandomQuestion = async (req, res) => {
  const count = await Question.countDocuments();
  const random = Math.floor(Math.random() * count);
  const question = await Question.findOne().skip(random);
  res.json(question);
};

module.exports = { createQuestion, getAllQuestions, getRandomQuestion };