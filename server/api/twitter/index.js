'use strict';

var controller = require('./twitter.controller'),
    express = require('express'),
    router = express.Router();


router.get('/:id/user_timeline', controller.timeLine);

module.exports = router;