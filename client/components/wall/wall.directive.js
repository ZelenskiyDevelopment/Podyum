'use strict';

angular.module('abroadathletesApp')
  .directive('wall', function (Event) {
    return {
      templateUrl: 'components/wall/wall.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        events: '='
      },
      link: function (scope, element, attrs) {
        scope.events = [];
        Event.getAllEvents().$promise.then(function(results){
          scope.events = results;
        });

        scope.refreshEventAfterModalDismiss = function(){
          Event.getAllEvents().$promise.then(function(results){
            scope.events = results;
          });
        }
      },
      controller: function ($scope) {
        this.addEvent = function (event) {
          $scope.events.unshift(event);
        }
      }
    };
  });
