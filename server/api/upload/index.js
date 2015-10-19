'use strict';

var express = require('express');
var controller = require('./upload.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.uploadProfilePhoto);
router.post('/photos', auth.isAuthenticated(), controller.upload);

module.exports = router;
