'use strict';

angular.module('abroadathletesApp')
  .controller('ManageRosterCtrl', function ($scope, User) {

        console.log('init');
    User.get().$promise.then(function (me) {
      $scope.user = me;
      $scope.myPlayers = $scope.user.assigned.filter(function (assignedUser) {
        return assignedUser.user.kind === 'player' && assignedUser.isPresent;
      });

      $scope.myCoaches = $scope.user.assigned.filter(function (assignedUser) {
        return assignedUser.user.kind === 'coach' && assignedUser.isPresent;
      });

      if(me.managesRoster.length > 0) {
        User.getUserManagesRoster({id: me._id}).$promise.then(function(user) {
          $scope.myManagedRoster = user.managesRoster;
        });
      }

      $scope.sortChoice = 'user.player.lastName';

      $scope.changeSort = function(type) {
        if(type === $scope.sortChoice) {
          $scope.sortChoice = '-'+$scope.sortChoice;
        }
        else {
          $scope.sortChoice = type;
        }
      };

      if(me.kind ==="team") {
        User.getUserRosterAdmins({id: me._id}).$promise.then(function (user) {
          $scope.myRosterAdmins = user.rosterAdmins;
        });
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
          $scope.presentRequests = $scope.assignRequests.filter(function (user) {
              return user.isPresent;
          });
          $scope.pastRequests = $scope.assignRequests.filter(function (user) {
            return !user.isPresent;
          });
        });
      }

      $scope.revokeRosterAdmin = function(ID, ind) {
        var data= {id:ID};
        $scope.myRosterAdmins.splice(ind,1);
        User.revokeRosterAdmin({data: data});
      };

      $scope.removeFromTeam = function(index, ID) {
        if ($scope.user.kind === "team") {
          $scope.myPlayers.splice(index, 1);
          User.removeFromTeam({idChild: $scope.user._id, idParent: ID, isPresent: true});
        }
        else {
          $scope.myPlayers.splice(index,1);
          User.removeFromTeam({idChild: $scope.user.managesRoster[$scope.chosenTeam], idParent: ID, isPresent: true});
        }
      };

      $scope.chooseTeamToManage = function(ind) {
        $scope.chosenTeam = ind;
        User.getUserByTeam({id: $scope.myManagedRoster[ind]._id}).$promise.then(function (user) {
          $scope.myPlayers = user.assigned.filter(function (assignedUser) {
            return assignedUser.user.kind === 'player' && assignedUser.isPresent;
          });
        });
        User.getAssignRequestsAsAdmin({id: $scope.myManagedRoster[ind]._id}).$promise.then(function (users) {
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
          $scope.presentRequests = $scope.assignRequests.filter(function (user) {
            return user.isPresent;
          });
          $scope.pastRequests = $scope.assignRequests.filter(function (user) {
            return !user.isPresent;
          });
        });
      };

      $scope.acceptAssignRequests = function(ID){
        if(ID.name) {
          User.acceptRecruitRequest({data:ID});
        }
        else {
          User.acceptAssignRequests({data: ID});
        }
        if(ID.isPresent) {
          _.remove($scope.presentRequests, function(assignRequest){return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)});
        }
        else {
          _.remove($scope.pastRequests, function(assignRequest){return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)});
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


    });
  });
