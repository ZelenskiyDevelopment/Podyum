'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/own', auth.isAuthenticated(), controller.getOwnEvents);
router.get('/:id/getOwnEventsById', auth.isAuthenticated(), controller.getOwnEventsById);
router.get('/:id/getOwnEventsToUser', auth.isAuthenticated(), controller.getOwnEventsToUser);
router.get('/:id/getCommentsForEvent', auth.isAuthenticated(), controller.getCommentsForEvent);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/getMyPosts', auth.isAuthenticated(), controller.getMyPosts);
router.post('/create', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/:id/addComment', auth.isAuthenticated(), controller.addComment);
router.post('/:id/sendCongrats', auth.isAuthenticated(), controller.sendCongrats);
router.post('/:id/share', auth.isAuthenticated(), controller.share);

module.exports = router;
