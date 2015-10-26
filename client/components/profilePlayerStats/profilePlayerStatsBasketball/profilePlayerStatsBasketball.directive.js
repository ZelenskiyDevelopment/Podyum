'use strict';

angular.module('abroadathletesApp')
  .directive('profilePlayerStatsBasketball', function () {
    return {
      templateUrl: 'components/profilePlayerStats/profilePlayerStatsBasketball/profilePlayerStatsBasketball.html',
      restrict: 'EA',
      scope: {
        user: '='
      },
      controller: function($scope, Game) {
        Game.getGamesForTeams({id: $scope.user._id}).$promise.then(function (games) {
          _.remove(games, function(game) {
            return !game.data.isFinished || !game.userData;
          });
          $scope.games = games;

          $scope.myGameStats = new Array($scope.games.length);
          for (var i = 0; i < $scope.games.length; i++) {
            if ($scope.games[i].userData && $scope.games[i].userData[$scope.user._id]) {
              $scope.myGameStats[i] = $scope.games[i].userData[$scope.user._id];
            }
          }
          $scope.myStats = _.fill(Array(14), 0);

          for (var i = 0; i < $scope.myGameStats.length; i++) {
            for (var j = 0; j < 14; j++) {
              if($scope.myGameStats[i])
                $scope.myStats[j] += $scope.myGameStats[i][j];
            }
          }
        });
      },
      link: function (scope, element, attrs) {
      }
    };
  });
