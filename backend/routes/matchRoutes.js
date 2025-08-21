const express = require("express");
const { createMatch, finishMatch, getMatchHistory } = require("../controllers/matchController");

const router = express.Router();

router.post("/", createMatch);
router.patch("/:id", finishMatch);
router.get("/user/:userId", getMatchHistory);

module.exports = router;