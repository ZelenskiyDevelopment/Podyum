'use strict';

angular.module('abroadathletesApp')
  .filter('getName', function () {
    return function (input) {
      if (['fan', 'player', 'coach'].indexOf(input.kind) >= 0) {
        return _.get(input[input.kind], 'firstName', '') + ' ' + _.get(input[input.kind], 'lastName', '');
      } else {
        return _.get(input[input.kind], 'name', '');
      }
    };
  });
