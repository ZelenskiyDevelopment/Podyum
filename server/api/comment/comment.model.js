'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);