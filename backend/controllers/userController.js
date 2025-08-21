const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = await User.create({ username: req.body.username });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

const updateScore = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $inc: { score: 1 } },
    { new: true }
  );
  res.json(user);
};

module.exports = { createUser, getUser, updateScore };