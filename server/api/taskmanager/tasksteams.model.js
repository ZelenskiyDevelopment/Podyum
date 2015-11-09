'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var TasksTeams = new Schema({
    id_user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskFor: String,
    description: String,
    name: String,
    dueDate: Date,
    shareWith: String,
    isComplete: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('TasksTeams', TasksTeams);