'use strict';

var express = require('express');
var controller = require('./user.controller');
var relationController = require('./user.relations.controller');
var recruiting = require('./recruiting/user.recruiting.controller');
var followRelationsController = require('./relations/user.relations.follow.controller');
var assignRelationsController = require('./relations/user.relations.assign.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var messageNotificationsCtrl = require('./notifications/user.notifications.messages.controller');
var userPhotosController = require('./photos/user.photos.controller');
var liveStatsBannerSettingsCtrl = require('./live-stats-banner-settings/live-stats-banner-settings.controller');
var trackingController = require('./tracking/user.relations.tracking.controller');

module.exports = function(orientDatabase) {
  var router = express.Router();
  //router.get('/', auth.hasRole('admin'), controller.index);

  router.get('/', controller.index);

  router.post('/settings', auth.isAuthenticated(), liveStatsBannerSettingsCtrl.postSettings);
  router.get('/settings', auth.isAuthenticated(), liveStatsBannerSettingsCtrl.getSettings);

  router.get('/search', auth.isAuthenticated(), controller.search);
  router.get('/myTeams', auth.isAuthenticated(), relationController.getMyTeams);

  router.get('/getInvitations', auth.isAuthenticated(), relationController.getInvitations);
  router.get('/getAssignRequests', auth.isAuthenticated(), relationController.getAssignRequests);
  router.get('/:id/getAssignRequestsAsAdmin', auth.isAuthenticated(), relationController.getAssignRequestsAsAdmin);
  router.get('/getNotifications', auth.isAuthenticated(), relationController.getNotifications);
  router.get('/getNewNotifications', auth.isAuthenticated(), relationController.getNewNotifications);
  router.get('/getNewGameData', auth.isAuthenticated(), relationController.getNewGameData);
  router.post('/updateNotifications', auth.isAuthenticated(), relationController.updateNotifications);

  router.post('/updateStats', auth.isAuthenticated(), controller.updateStats);
  router.post('/updateProfile', auth.isAuthenticated(), controller.updateProfile);

  router.get('/:id/getUserById', auth.isAuthenticated(), controller.getUserById);

  router.delete('/:id', auth.hasRole('admin'), controller.destroy);
  router.get('/me', auth.isAuthenticated(), controller.me);
  router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
  router.put('/complete', auth.isAuthenticated(), controller.completeData);
  router.get('/:id', auth.isAuthenticated(), controller.show);
  router.post('/', controller.create);
  router.post('/createUserByTeam', controller.createUserByTeam);
  router.post('/assign', auth.isAuthenticated(), assignRelationsController.assign);
  router.post('/addToTeam', auth.isAuthenticated(), assignRelationsController.addToTeam);
  router.post('/addToTeamAsAdmin', auth.isAuthenticated(), assignRelationsController.addToTeamAsAdmin);
  router.post('/leave', auth.isAuthenticated(), assignRelationsController.leave);
  router.post('/removeFromTeam', auth.isAuthenticated(), assignRelationsController.removeFromTeam);

  router.post('/changeMembership', auth.isAuthenticated(), controller.changeMembership);

  router.post('/grantStatsAdmin', auth.isAuthenticated(), relationController.grantStatsAdmin);
  router.post('/revokeStatsAdmin', auth.isAuthenticated(), relationController.revokeStatsAdmin);
  router.post('/grantRosterAdmin', auth.isAuthenticated(), relationController.grantRosterAdmin);
  router.post('/revokeRosterAdmin', auth.isAuthenticated(), relationController.revokeRosterAdmin);

  router.post('/acceptAssignRequest', auth.isAuthenticated(), assignRelationsController.acceptAssignRequest);
  router.post('/acceptRecruitRequest', auth.isAuthenticated(), assignRelationsController.acceptRecruitRequest);
  router.post('/rejectAssignRequest', auth.isAuthenticated(), assignRelationsController.rejectAssignRequest);
  router.post('/rejectRecruitRequest', auth.isAuthenticated(), assignRelationsController.rejectRecruitRequest);

  router.post('/friends', auth.isAuthenticated(), relationController.invite);
  router.post('/acceptInvitation', auth.isAuthenticated(), relationController.acceptInvitation);
  router.post('/rejectInvitation', auth.isAuthenticated(), relationController.rejectInvitation);
  router.post('/unFriendUser', auth.isAuthenticated(), relationController.unFriendUser);

  router.post('/followUser', auth.isAuthenticated(), followRelationsController.followUser);
  router.post('/unFollowUser', auth.isAuthenticated(), followRelationsController.unFollowUser);
  router.get('/:id/getUserByTeam', auth.isAuthenticated(), relationController.getUserByTeam);
  router.get('/:id/getUsersAndFollowersByTeam', auth.isAuthenticated(), relationController.getUsersAndFollowersByTeam);
  router.get('/:id/getUserFriends', auth.isAuthenticated(), relationController.getUserFriends);
  router.get('/:id/getUserStatsAdmins', auth.isAuthenticated(), relationController.getUserStatsAdmins);
  router.get('/:id/getUserRosterAdmins', auth.isAuthenticated(), relationController.getUserRosterAdmins);
  router.get('/:id/getUserManagesStats', auth.isAuthenticated(), relationController.getUserManagesStats);
  router.get('/:id/getUserManagesRoster', auth.isAuthenticated(), relationController.getUserManagesRoster);
  router.get('/:id/getAllTeams', auth.isAuthenticated(), controller.getAllTeams);
  router.get('/:id/getAllLeagues', auth.isAuthenticated(), controller.getAllLeagues);
  router.get('/:id/getAllHumanUsers', auth.isAuthenticated(), controller.getAllHumanUsers);

  router.get('/team/:id/couches', auth.isAuthenticated(), relationController.getCoachesAssignedToTeam);
  router.get('/team/:id/players', auth.isAuthenticated(), relationController.getPlayersAssignedToTeam);


  router.get('/:id/notifications/messages', auth.isAuthenticated(), messageNotificationsCtrl.getMessagesNotifications);
  router.put('/:id/notifications/messages', auth.isAuthenticated(), messageNotificationsCtrl.readMessage);

  router.post('/getAllowValues', auth.isAuthenticated(), recruiting.getAllowValues);
  router.post('/find', auth.isAuthenticated(), recruiting.find);

  router.get('/:targetUserId/:targetPhoto', auth.isAuthenticated(), userPhotosController.getPhoto);
  router.post('/:targetUserId/:targetPhoto/addComment', auth.isAuthenticated(), userPhotosController.addComment);
  router.post('/:targetUserId/:targetPhoto/addMedal', auth.isAuthenticated(), userPhotosController.addMedal);
  router.delete('/:targetUserId/:targetPhoto', auth.isAuthenticated(), userPhotosController.destroy);

  router.post('/trackUser', trackingController.noteTracking);

  return router;
};
