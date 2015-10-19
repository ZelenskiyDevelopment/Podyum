'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobsSchema = new Schema({
  name: String,
  description: String,
  taken: Boolean,
  reward: Number,
  featured: Boolean,
  date: { type: Date, default: Date.now },
  employer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  employee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  city: String,
  team: String
});

module.exports = mongoose.model('Job', JobsSchema);
