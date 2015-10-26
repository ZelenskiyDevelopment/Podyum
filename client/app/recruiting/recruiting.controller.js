'use strict';
var PAGE_SIZE = 10;
angular.module('abroadathletesApp')
.controller('RecruitingCtrl', function ($scope, GamePositions, Recruiting) {
  $scope.more = false;
  $scope.page = 0;
  $scope.loading = false;
  $scope.result = [];
  $scope.kinds = ['Coach', 'Athlete'];
  $scope.sports = ['American football', 'Basketball'];
  $scope.filtering = {
    kind: undefined,
    sport: undefined
  };

  $scope.loadMore = function() {
    ++$scope.page;
    fetchResult(true);
  };

  var fetchResult = _.debounce(function(append) {
    if(!$scope.filtering.kind) {
      return;
    }
    $scope.loading = true;
    var payload = _.extend({}, $scope.filtering, {
      pagination: {
        page: $scope.page,
        pageSize: PAGE_SIZE
      }
    });
    if(append !== true) {
      $scope.result = [];
    }
    Recruiting.find(payload).then(function(result) {
      $scope.loading = false;
      $scope.more = result.length === PAGE_SIZE;
      $scope.result = $scope.result.concat(result);

      if(append !== true) {
        $scope.page = 0;
      }
    });
  }, 500, {
    leading: true
  });

  $scope.$watch('filtering', fetchResult);
  $scope.$watch('filtering.kind', function(newKind, oldKind) {
    if(!newKind) {
      return;
    }
    var kind = newKind === 'Athlete' ? 'player' : newKind.toLowerCase();
    var field = kind + '.experience';
    Recruiting.getAllowValues(field, {kind: kind}).then(function(allowValues) {
      $scope.experiences = allowValues;
      $scope.positions = [];
    });

    fetchResult();
  });
  $scope.$watch('filtering.sport', function(newSport, oldSport) {
    if(!newSport) {
      return;
    }
    $scope.positions = GamePositions.getPositionsForSport(newSport);
  });
});
