'use strict';

var controller = require('./team.controller'),
    express = require('express'),
    router = express.Router();

router.post('/addTeam', controller.addTeam);
router.post('/addToTeam', controller.addToTeam);
router.post('/updateTeam', controller.updateTeam);

router.get('/:id/getTeam', controller.getTeam);
router.get('/:id/getTeamById', controller.getTeamById);
router.get('/:id/getAssignRequests', controller.getAssignRequests);
router.get('/getAllTeam', controller.getAllTeam);


module.exports = router;