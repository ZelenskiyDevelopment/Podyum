'use strict';

var Team = require('./team.model'),

    assignedToTeam = require('./assignedToTeam.model'),

    socket = require('../../config/socketio.js')();


exports.addTeam = function(req, res) {

    var data = req.body;

    console.log(data);
    var newTeam = new Team(data);

    newTeam.save(function(err){
        if (err) throw err;

        res.send(200);
    });
};


exports.updateTeam = function(req, res) {

    var data = req.body,

        id = data._id;

    delete data._id;
    delete data.__v;

    console.log(id);
    Team.update({_id: id}, {$set: data}, {}, function(err){
        if (err) return validationError(res, err);

        res.send(200);
    });

};

exports.acceptAssignRequest = function(req, res) {
    var userId = req.user._id;
};

exports.rejectAssignRequest = function(req, res) {
    var userId = req.user._id;
};

exports.addToTeam = function(req, res) {

    var  data  = req.body;

    var addToTeam  = new assignedToTeam(data);

    addToTeam.save(function(err){
        Team.findById(data.id_team, function (err, fromUser) {

            socket.directMessage(data.id_user, 'assignRequest', fromUser);

        });

    });
};

exports.getAssignRequests = function(req, res) {
    var userId = req.params.id;

    assignedToTeam.find({
        id_user: userId
    }).execQ().then(function (team) {
        Team.findById(team[0].id_team, function (err, fromUser) {

            return res.json(200, fromUser);
        });
    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.getTeam = function(req, res) {
    var userId = req.params.id;
    Team.find({
        id_user: userId
    }).execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
}

exports.getAllTeam = function(req, res) {
    Team.find().execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

function validationError(res, err) {
    return res.json(422, err);
}
