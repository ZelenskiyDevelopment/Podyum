'use strict';

var _ = require('lodash');
var GameMessage = require('./gamemessage.model');


exports.show = function (req, res) {

    var data = req.body;

    var NewGameMessage = GameMessage({
        id_game: data.id_game,
        message: data.message
    });


    NewGameMessage.save(function(err) {
        if (err) throw err;

        console.log('User created!');
    });
};