'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;


var assignedToLeague  = ({
    id_user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    id_league: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
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
    isPresent:Boolean
});

module.exports = mongoose.model('assignedToLeague', assignedToLeague);