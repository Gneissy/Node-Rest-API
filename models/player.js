const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  age: Number,
  recordDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
