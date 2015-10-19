'use strict';

angular.module('abroadathletesApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, $modal, Auth, User, socket) {
    $scope.isCollapsedTop = true;
    $scope.isCollapsedBottom = true;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return $location.path().indexOf(route)>-1;
    };

    $scope.logout = function(){
      Auth.logout();
      $location.path('/');

    };

    $scope.invitationsNumber = 0;
      $scope.invitations = [];
      User.getInvitations().$promise.then(function (users) {
        $scope.invitations = _.map(users, function (user) {
          return {
            firstName: user[user.kind].firstName,
            lastName: user[user.kind].lastName,
            profilePhoto: user.profilePhoto,
            _id: user._id
          }
        });
        if ($scope.invitations.length > 3) {
          $scope.invitationsNumber = 4;
        }
        else {
          $scope.invitationsNumber = $scope.invitations.length;
        }
      });


      $scope.assignRequests = [];
      User.getAssignRequests().$promise.then(function (users){
        $scope.assignRequests = _.map(users, function(user){
          return {
            firstName: user.user[user.user.kind].firstName,
            lastName: user.user[user.user.kind].lastName,
            name: user.user[user.user.kind].name,
            profilePhoto : user.user.profilePhoto,
            dateFrom: new Date(user['dateFrom']),
            dateTo: new Date(user['dateTo']),
            isPresent: user['isPresent'],
            position: user['position'],
            _id: user.user._id
          }
        });
        if ($scope.assignRequests.length > 3) {
          $scope.invitationsNumber = 4;
        }
        else {
          $scope.invitationsNumber = $scope.assignRequests.length;
        }
      });

    $scope.notificationsNumber = 0;

    $scope.notifications = [];
    User.getNotifications().$promise.then(function (serviceNotification) {
      $scope.notifications = serviceNotification;
    });

    $scope.newNotifications = [];
    User.getNewNotifications().$promise.then(function (serviceNotification) {
      $scope.newNotifications = serviceNotification;
      if ($scope.newNotifications.length > 3) {
        $scope.notificationsNumber = 4;
      }
      else {
        $scope.notificationsNumber = $scope.newNotifications.length;
      }
    });

    $scope.updateNotifications = function() {
      User.updateNotifications();
      $scope.notificationsNumber = 0;
    };

    $scope.acceptInvitation = function(ID){
      User.acceptInvitation({id:ID});
      _.remove($scope.invitations, function(invitation){return invitation._id === ID});
      $scope.invitationsNumber -= 1;
    };

    $scope.rejectInvitation = function(ID){
      User.rejectInvitation({id:ID});
      _.remove($scope.invitations, function(invitation){return invitation._id === ID});
      $scope.invitationsNumber -= 1;
    };

    $scope.acceptAssignRequests = function(ID){
      if(ID.name) {
        User.acceptRecruitRequest({data:ID});
      }
      else {
        User.acceptAssignRequests({data: ID});
      }
      _.remove($scope.assignRequests, function(assignRequest){return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)});
      $scope.invitationsNumber -= 1;
    };

    $scope.rejectAssignRequests = function(ID){
      if(ID.name) {
        User.rejectRecruitRequest({data:ID});
      }
      else {
        User.rejectAssignRequests({data:ID});
      }
      _.remove($scope.assignRequests, function(assignRequest){return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)});
      $scope.invitationsNumber -= 1;
    };

    socket.on('notification', function(notification){
      $scope.newNotifications.push(notification);
      $scope.notificationsNumber++;
    });
    socket.on('invitation', function(invitation){
      $scope.invitations.push(invitation);
      $scope.invitationsNumber++;
    });
    socket.on('assignRequest', function(invitation){
      $scope.assignRequests.push(invitation);
      $scope.invitationsNumber++;
    });
  });
