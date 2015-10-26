'use strict';

angular.module('abroadathletesApp')
  .filter('liveEventFilter', function () {
    return function (input) {
      return input.slice().reverse();
    };
  });
