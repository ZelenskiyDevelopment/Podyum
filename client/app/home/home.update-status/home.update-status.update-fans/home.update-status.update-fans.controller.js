'use strict';

angular.module('abroadathletesApp')
    .controller('showQuestioCtrl', function($scope, User) {
        $scope.userPromise = User.get().$promise;

        $scope.userPromise.then(function(me) {
            $scope.user;
        });
    })