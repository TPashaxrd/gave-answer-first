const express = require("express");
const { createUser, getUser, updateScore } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/:id/score", updateScore);

module.exports = router;