'use strict';

var controller = require('./league.controller'),
    express = require('express'),
    router = express.Router();


router.post('/addLeague', controller.addLeague);
router.post('/updateLeague', controller.updateLeague);

router.get('/:id/getLeague', controller.getLeague);
router.get('/getAll', controller.getAll);
router.get('/:id/getAssignRequests', controller.getAssignRequests);
router.get('/:id/acceptAssignRequest', controller.acceptAssignRequest);
router.get('/:id/rejectAssignRequest', controller.rejectAssignRequest);
module.exports = router;