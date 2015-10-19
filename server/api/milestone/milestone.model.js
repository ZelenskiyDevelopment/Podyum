'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MilestoneSchema = new Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sport: String,
    kind: String,
    subkind: String,
    value: Number
});

module.exports = mongoose.model('Milestone', MilestoneSchema);