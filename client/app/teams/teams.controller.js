'use strict';

angular.module('abroadathletesApp')
  .controller('TeamsCtrl', function ($scope,User,$location) {
    User.get().$promise.then(function (me) {
      if(!me.completed){
        $location.path('/creator');
      }
    });

    User.getMyTeams().$promise.then(function(teams){
      $scope.teams = teams;
      console.log(teams);
    });

    $scope.assign = function(ID){
      User.assignTo({id: ID});
      $scope.isAssign = true;
      $scope.refresh();
    };

    $scope.leave = function(ID){
      User.leave({id: ID});
      $scope.isAssign = false;
      $scope.refresh();
    };

    $scope.refresh = function(){
      User.get().$promise.then(function (me) {

        if(me['assignTo']){
          $scope.isAssign = true;
          $scope.me = me;
          $scope.myTeam = _.find($scope.users, function(team){
            return team._id === $scope.me.assignTo;
          });
        } else {
          $scope.isAssign = false;
        }
      });
    }
  });
