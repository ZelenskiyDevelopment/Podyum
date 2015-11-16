'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;


var assignedToTeam  = ({
    id_user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    id_team: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    accepted:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('assignedToTeam', assignedToTeam);