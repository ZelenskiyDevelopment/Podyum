'use strict';

angular.module('abroadathletesApp')
  .filter('capitalize', function () {
    return function (input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  });
