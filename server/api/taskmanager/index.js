/**
 * Created by dev on 05.11.15.
 */

'use strict';

var express = require('express');
var controller  = require('./taskmanager.controller');

var router = express.Router();

router.post('/addNewEvent', controller.addEvent);
router.post('/addNewTask', controller.addTask);
router.post('/updateTask', controller.updateTask);
router.post('/addSubTask', controller.addSubTask);

router.get('/:id/getAllEventsUser', controller.getAllEventsByUser);
router.get('/:id/getAllTasksUser', controller.getAllTaskByUser);
router.get('/:id/getTaskById', controller.getTaskById);

module.exports = router;