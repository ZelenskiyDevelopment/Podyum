/**
 * Created by dev on 05.11.15.
 */

'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var EventsTeams = new Schema({
    id_user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    event:{},
    startDate: Date,
    endDate: Date,
    Title: String
});


module.exports = mongoose.model('EventsTeams', EventsTeams);