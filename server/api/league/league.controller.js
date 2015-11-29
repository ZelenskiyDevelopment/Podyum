'use strict';

var League = require('./league.model'),

    assignedToLeague = require('./assignedToLeague.model');


exports.addLeague = function(req, res) {

    var data = req.body;

    var newTeam = new League(data);

    newTeam.save(function(err){
        if (err) throw err;

        res.send(200);
    });
};

exports.updateLeague = function(req, res) {


    var data = req.body,

        id = data._id;

    delete data._id;
    delete data.__v;

    console.log(id);
    League.update({_id: id}, {$set: data}, {}, function(err){
        if (err) return validationError(res, err);

        res.send(200);
    });


};

exports.getAll = function(req, res) {

    League.find().execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.getLeague = function(req, res) {

    var userId = req.params.id;

    League.find({
        id_user: userId
    }).execQ().then(function (events) {
        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });
};