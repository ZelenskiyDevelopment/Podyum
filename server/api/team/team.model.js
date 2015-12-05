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
    logoTeam: {
        type: String,
        default: 'team.jpg'
    },
    logoStadium: {
        type: String,
        default: 'team.jpg'
    },
    president:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    myLeagues:[{
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'League'
        },
        _id: false
    }],
    athleticDirector:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    headCoach: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Teams', Teams);