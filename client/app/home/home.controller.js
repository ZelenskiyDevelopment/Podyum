'use strict';

angular.module('abroadathletesApp')
    .controller('HomeCtrl', function ($scope, $state, User, $location, socket, $mdDialog, Milestone, Event, Teams, Game) {
        $scope.games = [];
        $scope.userPromise = User.get().$promise;
        $scope.userPromise.then(function (me) {
            if (!me.completed) {
                $location.path('/creator');
            }
            $scope.user = me;
            $scope.friendsNumber = $scope.user.friends.length;
            $scope.followersNumber = $scope.user.followed.length;
            Event.getOwnEvents().$promise.then(function (results) {

                angular.forEach(results, function (item, key) {
                    if (item.toUser === null) {
                        $scope.events.push(item);
                    }

                });

            });


            switch (me.kind) {

                case 'player':

                    Game.getAllGames().$promise.then(function (games) {
                        $scope.games = games;
                    });

                    break;

                case 'team':
                case 'coach':
                    Teams.getTeam({id: me._id}).$promise.then(function (result) {
                        Game.getGames({id: result[0]._id}).$promise.then(function (games) {
                            $scope.games = games;
                        });
                    });
                break;

            }

        });

        $scope.changeMembership = function () {
            if ($scope.user.role === 'free')
                $scope.user.role = 'premium';
            else
                $scope.user.role = 'free';
            User.changeMembership({data: $scope.user.role}).$promise.then(function () {
                User.get().$promise.then(function (me) {
                });
            });
        };

        $scope.showTrackingModal = function (event) {
            $mdDialog.show({
                controller: 'easyModalCtrl',
                resolve: {
                    value: function () {
                        return $scope.user.trackedBy;
                    }
                },
                templateUrl: 'app/home/profileTracker/profileTracker.html',
                targetEvent: event,
                parent: document.body,
                clickOutsideToClose: true
            });
        };
    });
