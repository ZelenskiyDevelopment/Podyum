'use strict';

angular.module('abroadathletesApp').filter('dateToLocaleString', function () {
  return function (input) {
    return new Date(input).toLocaleString();
  };
});
