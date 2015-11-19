'use strict';

angular.module('abroadathletesApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, $modal, Auth, User, socket, Teams) {
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

//        User.get().$promise.then(function (me) {
//            if(!me.completed){
//                $location.path('/creator');
//            }
//            Teams.getAssignRequests({id:me._id}).$promise.then(function (requests) {
//
//
//                $scope.invitations = requests;
//            });
//
//        });
//      User.getInvitations().$promise.then(function (users) {
//        $scope.invitations = _.map(users, function (user) {
//          return {
//            firstName: user[user.kind].firstName,
//            lastName: user[user.kind].lastName,
//            profilePhoto: user.profilePhoto,
//            _id: user._id
//          }
//        });
//        if ($scope.invitations.length > 3) {
//          $scope.invitationsNumber = 4;
//        }
//        else {
//          $scope.invitationsNumber = $scope.invitations.length;
//        }
//      });


      $scope.assignRequests = [];

        User.get().$promise.then(function (me) {

            Teams.getAssignRequests({id: me._id}).$promise.then(function (requests) {


                $scope.assignRequests[0] = requests;

            });

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



    $scope.acceptAssign = function(ID){
      if(ID.name) {
        User.acceptRecruitRequest({data:ID});
      }
      else {
        User.acceptAssignRequests({data: ID});
      }
      _.remove($scope.assignRequests, function(assignRequest){return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)});
      $scope.invitationsNumber -= 1;
    };

    $scope.rejectAssign = function(ID){
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
