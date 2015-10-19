'use strict';

var express = require('express');
var controller = require('./room.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);

router.put('/:id', auth.isAuthenticated(), controller.update);

router.get('/:id/threads', auth.isAuthenticated(), controller.showThreads);
router.post('/:id/threads', auth.isAuthenticated(), controller.createThread);
router.delete('/:id/leave', auth.isAuthenticated(), controller.leaveRoom);

router.get('/:id/:thread/messages', auth.isAuthenticated(), controller.showMessages);
router.post('/:id/:thread/messages', auth.isAuthenticated(), controller.createMessage);
router.delete('/:id/:thread/leave', auth.isAuthenticated(), controller.destroy);

router.post('/:id/:thread/favorite', auth.isAuthenticated(), controller.favorite);
router.delete('/:id/:thread/favorite', auth.isAuthenticated(), controller.leaveFavorite);




module.exports = router;
