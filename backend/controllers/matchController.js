const Match = require("../models/Match");
const User = require("../models/User");

// Yeni maç oluştur
const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Maçı bitir & kazananı kaydet
const finishMatch = async (req, res) => {
  try {
    const { winnerId } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { winner: winnerId },
      { new: true }
    );

    if (winnerId) {
      await User.findByIdAndUpdate(winnerId, { $inc: { score: 1 } });
    }

    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Kullanıcının maç geçmişi
const getMatchHistory = async (req, res) => {
  const matches = await Match.find({ players: req.params.userId })
    .populate("players question winner");
  res.json(matches);
};

module.exports = { createMatch, finishMatch, getMatchHistory };
