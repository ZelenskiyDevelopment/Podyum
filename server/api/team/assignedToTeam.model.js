'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;


var assignedToTeam  = ({
    id_user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    id_team: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Teams'
    },
    accepted:{
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    dateFrom: Date,
    dateTo: Date,
    isPresent: Boolean,
    requestToTeam: Boolean
});

module.exports = mongoose.model('assignedToTeam', assignedToTeam);