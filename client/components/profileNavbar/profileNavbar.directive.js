'use strict';

angular.module('abroadathletesApp')
  .directive('profileNavbar', function () {
    return {
      templateUrl: 'components/profileNavbar/profileNavbar.html',
      restrict: 'EA',
      controller: 'profileBarCtrl',
      link: function (scope, element, attrs) {
      }
    };
  });
