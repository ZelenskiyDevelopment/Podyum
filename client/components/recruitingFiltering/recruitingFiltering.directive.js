'use strict';

angular.module('abroadathletesApp')
  .directive('recruitingFiltering', function () {
    return {
      templateUrl: 'components/recruitingFiltering/recruitingFiltering.html',
      restrict: 'E',
      scope: {
        experiences: '=',
        positions: '=',
        filtering: '='
      },
      link: function (scope, element, attrs) {
        scope.selectedOptions = {
          experience: {},
          position: {},
          age: {
            min: 18,
            max: 34
          }
        };

        var getTrulyKeys = function(obj) {
          return _.transform(obj, function(memo, value, key) {
            if(value) {
              memo.push(key);
            }
          }, []);
        }
        scope.$watch('selectedOptions', function(newOptions, oldOptions) {
          var filtering = scope.filtering;
          if(newOptions.experience !== oldOptions.experience) {
            filtering.experience = getTrulyKeys(newOptions.experience);
          }
          if(newOptions.position !== oldOptions.position) {
            filtering.position = getTrulyKeys(newOptions.position);
          }
          filtering.age = newOptions.age;
          scope.filtering = _.extend({}, scope.filtering, filtering);
        }, true);
        
        scope.$watch('positions', function() {
          scope.selectedOptions.position = {};
        });
        scope.$watch('experiences', function() {
          scope.selectedOptions.experience = {};
        });
      }
    };
  });
