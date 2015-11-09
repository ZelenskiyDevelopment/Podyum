'use strict';

angular.module('abroadathletesApp')
    .directive('subbar', function () {
        return {
            templateUrl: 'components/subbar/subbar.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {

            }
        };
    });
