'use strict';

var mongoose = require('mongoose'),

  Schema = mongoose.Schema;

var GameSchema = new Schema({
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  team1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  team2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: Date,
  data: {T1: [], T2: [], score1: Number, score2: Number, winner: Number, isFinished: Boolean, quart: Number, time: Number},
  userData: {},
  lastIn: {},
  sport: String
});

module.exports = mongoose.model('Game', GameSchema);
