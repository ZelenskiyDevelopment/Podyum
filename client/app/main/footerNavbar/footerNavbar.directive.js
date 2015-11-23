'use strict';

angular.module('abroadathletesApp')
  .directive('footerNavbar', function ($window, $location, $anchorScroll) {
    return {
      templateUrl: 'app/main/footerNavbar/footerNavbar.html',
      restrict: 'EA',
      controller: function($scope, $http, $location, $mdToast, Auth, $localStorage) {
        $scope.scrollTo = function(elem) {
          $location.hash(elem);
          $anchorScroll();
        }
      }
    };

  })
