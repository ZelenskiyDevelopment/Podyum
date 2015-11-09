'use strict';

var express = require('express');
var controller = require('./subscription.controller');

var router = express.Router();

router.post('/success', controller.success);
router.post('/cancel', controller.cancel);
module.exports = router;