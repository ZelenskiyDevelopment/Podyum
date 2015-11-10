/**
 * Created by dev on 05.11.15.
 */

'use strict';

var TeamsEvents = require('./eventsteams.model');
var TasksTeams = require('./tasksteams.model');
var mongo = require('mongodb');

exports.addEvent = function(req, res) {

    var data = req.body;

    TeamsEvents.findOne({Title: data.event.Title}, function(err, doc){
        if (doc) {

            var response = {
                status: 'error',
                message: 'Event exist'
            };

            res.json(response);

        } else {
            var NewEvent = new TeamsEvents({
                id_user: data.id_user,
                Title: data.event.Title,
                startDate: data.event.startDate,
                endDate: data.event.endDate
            });

            NewEvent.save(function(err){

                if (err) throw err;

                res.send(200);

            });
        }

    });

}


exports.addTask = function(req, res) {

    var data = req.body;

    var newTask = new TasksTeams({
        id_user: data.id_user,
        taskFor: data.taskFor,
        description: data.description,
        name: data.name,
        dueDate: data.dueDate,
        shareWith: data.shareWith
    });

    newTask.save(function(err){
        if (err) throw err;

        res.send(200);
    });
};

exports.getAllEventsByUser = function(req, res) {
    var userId = req.params.id;
    TeamsEvents.find({
        id_user: userId
    }).execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
};


exports.getAllTaskByUser = function(req, res) {
    var userId = req.params.id;
    TasksTeams.find({
        id_user: userId
    }).execQ().then(function (tasks) {
        return res.json(200, tasks);
    }).catch(function (err) {
        return handleError(res, err);
    })
};

exports.getSubTasks = function(req, res) {
    var taskId = req.params.id;

    TasksTeams.find({
        parentTask: taskId
    }).execQ().then(function (tasks) {
        return res.json(200, tasks);
    }).catch(function (err) {
        return handleError(res, err);
    })
}

exports.getTaskById  = function(req, res) {
    var idTask = req.params.id;
    var findId = new mongo.ObjectID(idTask);
    TasksTeams.find({
        _id: findId
    }).execQ().then(function(task) {
        return res.json(200, task);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.updateTask = function(req, res) {

    var data = req.body.data;
    var id = data._id;
    delete data._id;
    delete data.__v;
    delete data.subtask;
    TasksTeams.update({_id: id},  {$set:data}, {}, function (err) {
        if (err) return validationError(res, err);
        TasksTeams.find({
            id_user: data.id_user
        }).execQ().then(function(task) {
            return res.json(200, task);
        }).catch(function (err) {
            return handleError(res, err);
        });
    });
}

exports.addSubTask = function(req, res) {

    var data = req.body.data;

    var newTask = new TasksTeams(data);

    newTask.save(function(err){
        if (err) throw err;

        TasksTeams.find({
            parentTask: data.parentTask
        }).execQ().then(function (tasks) {
            return res.json(200, tasks);
        }).catch(function (err) {
            return handleError(res, err);
        })

    });
}

function validationError(res, err) {
    return res.json(422, err);
}
