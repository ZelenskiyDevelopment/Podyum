'use strict';

var express = require('express');
var controller = require('./conversation.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);

router.post('/:id/message', auth.isAuthenticated(), controller.createMessage);
router.get('/:id/messages', auth.isAuthenticated(), controller.getMessages);

module.exports = router;
