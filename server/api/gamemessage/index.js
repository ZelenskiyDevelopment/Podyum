'use strict';

var express = require('express');
var controller = require('./gamemessage.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.post('/game_message', controller.show);

module.exports = router;

