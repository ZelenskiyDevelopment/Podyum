'use strict';

angular.module('abroadathletesApp')
  .directive('liveStatsBanner', function (Game, $window, Auth, liveStatsBannerSettings) {
    var ALL = 'All selected';
    return {
      templateUrl: 'components/live-stats-banner/live-stats-banner.html',
      restrict: 'E',
      scope: {},
      link: function (scope, element, attrs) {
        scope.league = {selected: ALL};
        scope.gameGroups = [];
        scope.settings = {};
        scope.isVisibleSettings = false;
        scope.isVisibleLeagueSelector = false;

        var getSettingsWatch = scope.$watch(function () {
          return Auth.getCurrentUser()._id;
        }, function () {
          if (Auth.getCurrentUser()._id) {
            scope.isVisibleLeagueSelector = Auth.getCurrentUser().kind !== 'league';
            scope.isVisibleSettings = ['player','coach','fan'].indexOf(Auth.getCurrentUser().kind) >=0;
            scope.settings = liveStatsBannerSettings.getSettings();
            getSettingsWatch();
          }
        });

        var resize = function (array, n) {
          return _.reduce(array, function (acc, item, i) {
            if (i % n === 0) {
              acc.push([item]);
            } else {
              _.last(acc).push(item);
            }
            return acc;
          }, []);
        };

        var getGroupSize = function(){
          return Math.max(1, Math.round(($window.innerWidth - 300) / 200));
        };

        scope.$watch('league.selected', function(newLeagueName){
          var filteredLeagues = newLeagueName === ALL? scope.allGames: _.filter(scope.allGames, function(game){
            return _.get(game,'league.league.name', '') === newLeagueName;
          });

          scope.gamesGroups = resize(filteredLeagues, getGroupSize());
        });

        scope.$watch('settings', function () {
          Game.getAllGames({}, scope.settings).$promise.then(function (games) {
            scope.allGames = games;
            scope.gamesGroups = resize(scope.allGames, getGroupSize());

            scope.leagues = _(games).map(function (game) {
              return _.get(game, 'league.league.name', null);
            }).compact().uniq().value();
            scope.leagues.push(ALL);
            scope.leagues = _.sortBy(scope.leagues);
          });
        }, true);

        scope.$watch(function () {
          return $window.innerWidth;
        }, _.debounce(function (value) {
          scope.gamesGroups = resize(scope.allGames, getGroupSize());
        }, 500, {trailing: true}));


      }
    };
  });
