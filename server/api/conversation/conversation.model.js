'use strict';

var mongoose = require('mongoose-q')(),
    Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  messages:[{
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    date: {type: Date, default: Date.now}
  }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
