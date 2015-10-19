'use strict';

angular.module('abroadathletesApp')
  .directive('profileNavbar', function () {
    return {
      templateUrl: 'components/profileNavbar/profileNavbar.html',
      restrict: 'EA',

      link: function (scope, element, attrs) {
      }
    };
  });
