'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var GameMessageSchema = new Schema({
    id_game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    message: String
});

module.exports = mongoose.model('GameMessage', GameMessageSchema);
