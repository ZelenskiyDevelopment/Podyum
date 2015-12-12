'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorFinishCtrl', function ($scope) {
        $scope.check = function() {
            console.log($scope.emailUser);
            console.log($scope.passwordUser);
            console.log($scope.formData);
        }
    });

