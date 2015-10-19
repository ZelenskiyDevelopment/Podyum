'use strict';

angular.module('abroadathletesApp')
  .directive('ageSelector', function () {
    return {
      templateUrl: 'components/ageSelector/ageSelector.html',
      restrict: 'EA',
      scope: {
        age: '='
      },
      link: function (scope, element, attrs) {
        scope.$watchCollection('age', function(newAge, oldAge) {
          if(newAge === oldAge){
            return;
          }
          if(newAge.min !== oldAge.min && newAge.min > newAge.max) {
            scope.age.max = newAge.min;
          }
          if(newAge.max !== oldAge.max && newAge.min > newAge.max) {
            scope.age.min = newAge.max;
          }
        });
      }
    };
  });
