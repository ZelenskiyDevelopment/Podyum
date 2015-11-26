'use strict';

angular.module('abroadathletesApp')
  .controller('TeamsCtrl', function ($scope, User, $location, Teams, $state) {

        $scope.team = [];
        $scope.currentUrl = '';
        $scope.currentUrl = $state.current.url;

        User.get().$promise.then(function (me) {
          if(!me.completed){

            $location.path('/creator');
          }

        Teams.getTeam({id:me._id}).$promise.then(function(result){

            $scope.team  = result;
        })
    });

    $scope.stateChange = function() {
        $state.go($scope.stateSelected);

    };

    $scope.isActive = function(route) {
      return $location.path().indexOf(route)>-1;
    };

    $scope.checkState = function(check) {
      return $location.path().indexOf(check)>-1;
    };
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

    $scope.existingTeam = false;




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
