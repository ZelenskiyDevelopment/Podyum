/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var _ = require('lodash');
var usersSeed = require('./collectionsSeed/usersSeed');
var jobsSeed = require('./collectionsSeed/jobsSeed');
var photoSeed = require('./collectionsSeed/photosSeed');
var commentSeed = require('./collectionsSeed/commentsSeed');
var milestoneSeed = require('./collectionsSeed/milestonesSeed');

usersSeed.refillCollection();
jobsSeed.refillCollection();
photoSeed.refillCollection();
commentSeed.refillCollection();
milestoneSeed.refillCollection();
