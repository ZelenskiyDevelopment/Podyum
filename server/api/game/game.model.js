'use strict';

var mongoose = require('mongoose'),

  Schema = mongoose.Schema;

var GameSchema = new Schema({
  league: {type: mongoose.Schema.Types.ObjectId, ref: 'League',   default: null},
  team1: {type: mongoose.Schema.Types.ObjectId, ref: 'Teams'},
  team2: {type: mongoose.Schema.Types.ObjectId, ref: 'Teams'},
  date: Date,
  data: {T1: [], T2: [], score1: Number, score2: Number, winner: Number, isFinished: Boolean, quart: Number, time: Number},
  userData: {},
  lastIn: {},
  homeTeam: String,
  guestTeam: String,
  sport: String,
  liveStream: String,
  place: String,
  stadiumArena: String,
  time: Date
});

module.exports = mongoose.model('Game', GameSchema);
