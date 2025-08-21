const express = require("express");
const { createQuestion, getAllQuestions, getRandomQuestion } = require("../controllers/questionController");

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/random", getRandomQuestion);

module.exports = router;
