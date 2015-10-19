'use strict';

var mongoose = require('mongoose-q')(),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  description: String,
  type: String,
  date: { type: Date, default: Date.now },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Photo'
    }
  ],
  video: String,
  isShared : {type: Boolean, default: false},
  originalEvent: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  medals: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Event', EventSchema);
