'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var Teams = new Schema({

    id_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    teamName: String,
    country: String,
    address: String,
    mascot: String,
    teamColor: String,
    yearFounded: String,
    stadiumName: String,
    telephoneNumber: String,
    email: String,
    website: String,
    president:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    myLeagues: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    athleticDirector:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    headCoach: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Teams', Teams);