/**
 * Created by dev on 05.11.15.
 */

'use strict';

var TeamsEvents = require('./eventsteams.model');
var TasksTeams = require('./tasksteams.model');

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
}

exports.getAllEventsByUser = function(req, res) {
    var userId = req.params.id;
    TeamsEvents.find({
        id_user: userId
    }).execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
}

