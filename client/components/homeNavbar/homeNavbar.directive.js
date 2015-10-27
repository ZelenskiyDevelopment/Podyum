'use strict';

angular.module('abroadathletesApp')
    .directive('homeNavbar', function () {
        return {
            templateUrl: 'components/homeNavbar/homeNavbar.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {
            }
        };
    });
