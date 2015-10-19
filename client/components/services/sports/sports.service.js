'use strict';

angular.module('abroadathletesApp')
  .service('sports', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return [
      'football',
      'basketball'
    ]
  });
