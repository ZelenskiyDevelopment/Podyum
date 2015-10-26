'use strict';

angular.module('abroadathletesApp')
  .controller('newGameModal',function ($scope, User) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'month' && ( date.getMonth() > new Date().getMonth() && date.getYear() >= new Date().getYear() ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date(0);
    };
    $scope.toggleMax = function() {
      $scope.maxDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1
    };

    $scope.formats = ['dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);


    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i=0;i<$scope.events.length;i++){
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };
    $scope.teams = [];
    $scope.leagues = [];
    $scope.oryginalData = {};
    $scope.onChange = angular.noop;
    $scope.game = {};
    $scope.game.league = '';
    $scope.game.team1 = '';
    $scope.game.team2 = '';
    User.getNewGameData().$promise.then(function (newGameData){
      $scope.oryginalData = newGameData;
      if(newGameData.ownerKind === 'team'){
        $scope.leagues = newGameData.leagues;
        $scope.game.team1 = newGameData.ownerId;
        $scope.ownerName = newGameData.ownerName;
        console.log(newGameData)
        $scope.leagues.push({name:'All teams', _id:'all'});
        $scope.onChange = function(value){

          if(value ==='all'){
            $scope.teams = newGameData.teams;
          } else {
            $scope.teams = _.filter(newGameData.teams, function(team){
              return team.leagues.indexOf(value) >= 0;
            });
          }
        }
      } else if(newGameData.ownerKind = 'league'){
        $scope.teams = newGameData.teams;
        $scope.game.league = newGameData.ownerId;
      }
      $scope.newGameData = newGameData;
    });
});
