'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    photo: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    medals: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
});

module.exports = mongoose.model('Photo', PhotoSchema);