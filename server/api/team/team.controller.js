'use strict';

var Team = require('./team.model'),

    assignedToTeam = require('./assignedToTeam.model'),

    socket = require('../../config/socketio.js')();

var mongo = require('mongodb');

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
    var id = req.params.id;
    var data = {
        accepted: true,
        rejected: false
    };
    assignedToTeam.update({_id: id}, {$set:data}, {}, function (err) {
        if (err) return validationError(res, err);
        res.send(200);
    });
};

exports.rejectAssignRequest = function(req, res) {
    var id = req.params.id;
    var data = {
        rejected: true,
        accepted: false
    };
    assignedToTeam.update({_id: id}, {$set:data}, {}, function (err) {
        if (err) return validationError(res, err);
        res.send(200);
    });
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

exports.getPlayersByTeam = function(req, res) {

    var id = req.params.id;

    assignedToTeam.find({
        id_team: id
    }).execQ().then(function (playes) {

       return res.json(200, playes);
    }).catch(function (err) {
        return handleError(res, err);
    });

};

exports.getAssignRequests = function(req, res) {
    var userId = req.params.id;
    var response = [];
    assignedToTeam.find({
        id_user: userId
    }).execQ().then(function (request) {
        if (request.length == 0) {
            return res.json(422,response);
        }
       // Team.findById(request[0].id_team, function (err, fromUser) {
            //romUser.requests = [];
//            response.push(fromUser);
//            response.push({requests:request});
           // console.log(fromUser);
            return res.json(200, request);
       // });
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

exports.getTeamById  = function(req, res) {
    var Id = req.params.id;
    var findId = new mongo.ObjectID(Id);
    Team.find({
        _id: findId
    }).execQ().then(function(task) {
        return res.json(200, task);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

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
