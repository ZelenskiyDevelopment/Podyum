'use strict';

angular.module('abroadathletesApp')
  .filter('percentageDisplay', function () {
    return function (input) {
      if(isNaN(input)) {
        return '0%'
      }
      else {
        return Math.round(input * 100) + '%';
      }
    };
  });
