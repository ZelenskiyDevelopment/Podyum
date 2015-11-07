'use strict';

angular.module('abroadathletesApp')
    .controller('EventCtrl', function ($scope, $uibModalInstance,  $rootScope) {

        $scope.event = [];

        $rootScope.alertMessageEvent = '';

        $scope.ok = function () {

            var args = {

                title: $scope.event.title,
                start: $scope.event.startDate,
                end: $scope.event.endDate

            };

            $rootScope.$emit('EventAdd', args);

        };

        $rootScope.$on('CloseModal', function(event, args) {

            if (args.close) {
                $uibModalInstance.dismiss('close');
            }

        });

});