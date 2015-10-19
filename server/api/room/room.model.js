'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  title: String,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  lastUpdate: {type: Date, default: Date.now},
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  admins:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  threads: [{
    name:String,
    members:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    favorite:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages:[{
      author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      content: String,
      date: {type: Date, default: Date.now}
    }]
  }]
});

module.exports = mongoose.model('Room', RoomSchema);
