'use strict';

angular.module('abroadathletesApp')
  .directive('game', function () {
    return {
      templateUrl: 'components/game/game.html',
      restrict: 'E',
      scope: {
        team1:'=',
        team2:'=',
        league:'=',
        date:'=',
        data:'=',
        sport:'=',
        id:'=',
        time: '=',
        userdata:'=',
        userid:'=?'
      },
      controller: function($scope, StatsEditModal, UserStatsEditModal, Game, $location){
        $scope.isShow = false;
        if(!$scope.userid){
          $scope.userData = $scope.userdata;
        } else {
          $scope.userData = _.filter($scope.userdata, function(ud){
            return ud.user._id === $scope.userid;
          });

        }
          $scope.isActive = function (route) {
              return $location.path().indexOf(route) > -1;
          };

        $scope.edit  = function(){
          var data = {
            data : $scope.data,
            sport: $scope.sport,
            id: $scope.id
          };
          StatsEditModal.statsEdit.open()(data, function(d){
            console.log('id ' +$scope.id )
            Game.postData({id:$scope.id, data:d});
            console.log(d)
          });
        };
        $scope.useredit  = function(){
          var data = {
            data : $scope.data,
            sport: $scope.sport,
            id: $scope.id
          };
          UserStatsEditModal.userStatsEdit.open()(data, function(d){
            //console.log('id ' +$scope.id )
            Game.postUserData({id:$scope.id, data:d, userid: $scope.userid});
            console.log(d)
          });
        };
        $scope.show = function(){
          $scope.isShow=!$scope.isShow;
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
