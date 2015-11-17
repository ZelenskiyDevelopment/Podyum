'use strict';

angular.module('abroadathletesApp')
    .controller('ScheduleCtrl', function ($scope, User) {

        $scope.showInfo = function(data) {
            console.log(data);
        }

});