'use strict';

var express = require('express');
var controller = require('./game.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/all', auth.isAuthenticated(), controller.getAllGames);
router.post('/postData', controller.postData);
router.post('/postUserData', controller.postUserData);
router.post('/postLastIn', controller.postLastIn);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id/getGamesWithId',controller.getGamesWithId);
router.get('/:id/getGamesForTeams', controller.getGamesForTeams);
module.exports = router;
