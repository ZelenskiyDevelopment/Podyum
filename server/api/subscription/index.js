'use strict';

var express = require('express');
var controller = require('./subscription.controller');

var router = express.Router();

router.post('/pay', controller.pay);
router.get('/success', controller.success);
router.get('/cancel', controller.cancel);
module.exports = router;