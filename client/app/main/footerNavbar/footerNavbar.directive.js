'use strict';

angular.module('abroadathletesApp')
  .directive('footerNavbar', function ($window) {
    return {
      templateUrl: 'app/main/footerNavbar/footerNavbar.html',
      restrict: 'EA',
      controller: function($scope, $http, $location, $mdToast, Auth, $localStorage) {
      }
    };

  })
