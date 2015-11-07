/**
 * Created by dev on 05.11.15.
 */

'use strict';

var express = require('express');
var controller  = require('./taskmanager.controller');

var router = express.Router();

router.post('/addNewEvent', controller.addEvent);
router.post('/addNewTask', controller.addTask);
router.get('/:id/getAllEventsUser', controller.getAllEventsByUser);

module.exports = router;

