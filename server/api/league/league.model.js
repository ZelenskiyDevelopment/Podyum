'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var League = new Schema({

    id_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    leagueName: String,
    bio: String,
    founded: Date,
    logoLeague: String,
    address: String,
    website: String,
    country: String,
    executive: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('League', League);