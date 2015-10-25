'use strict';


var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var SubscriptionSchema =  new Schema({
    id_user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: String,
    date: Date,
    pay: Boolean,
    amount: Number
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);