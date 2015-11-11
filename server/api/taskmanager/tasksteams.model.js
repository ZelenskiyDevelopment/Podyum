'use strict';

var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var TasksTeams = new Schema({
    id_user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskFor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: String,
    name: String,
    dueDate: Date,
    shareWith: String,
    isComplete: {
        type: Boolean,
        default: false
    },
    parentTask:{type: mongoose.Schema.Types.ObjectId, ref: 'TasksTeams'}
});


module.exports = mongoose.model('TasksTeams', TasksTeams);