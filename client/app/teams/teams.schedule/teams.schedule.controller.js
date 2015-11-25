'use strict';

angular.module('abroadathletesApp')
    .controller('ScheduleCtrl', function ($scope, User, Game) {

        $scope.showInfo = function(data) {
            console.log(data);
        };

        User.get().$promise.then(function (me) {
            $scope.user = me;

            Game.getGames({id: me._id}).$promise.then(function (games) {
                $scope.games = games;
            });
            console.log($scope.games);
        });


});