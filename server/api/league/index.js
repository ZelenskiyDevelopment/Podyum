'use strict';

var controller = require('./league.controller'),
    express = require('express'),
    router = express.Router();


router.post('/addLeague', controller.addLeague);
router.post('/updateLeague', controller.updateLeague);

router.get('/:id/getLeague', controller.getLeague);
router.get('/getAll', controller.getAll);

module.exports = router;