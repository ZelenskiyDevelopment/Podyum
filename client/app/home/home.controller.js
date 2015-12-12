'use strict';


/**
 * @ngdoc object
 * @name abroadathletesApp.controller:HomeCtrl
 * @requires  $scope
 * @requires  $state
 * @requires abroadathletesApp.User
 * @requires $location
 * @requires uiCalendarConfig
 * @requires socket
 * @requires $mdDialog
 * @requires abroadathletesApp.Milestone
 * @requires abroadathletesApp.Event
 * @requires abroadathletesApp.Teams
 * @requires abroadathletesApp.Game
 * @description
 * Home controller
 */

angular.module('abroadathletesApp')
    .controller('HomeCtrl', function ($scope, $state, User, $location, uiCalendarConfig, socket, $mdDialog, Milestone, Event, Teams, Game, TwitterApi) {
        $scope.games = [];
        $scope.gamesTable = true;
        $scope.eventsTable = false;
        $scope.userPromise = User.get().$promise;
        $scope.userPromise.then(function (me) {
            if (!me.completed) {
                $location.path('/creator');
            }
            $scope.user = me;

            if (me.twitter.auth) {
                TwitterApi.getUserTimeLine({id:me.twitter.id}).$promise.then(function(result){
                    console.log(result);
                });
            }


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

                    Teams.getAssignRequests({id: me._id}).$promise.then(function (team) {

                        if (angular.isObject(team)) {

                            if (team.accepted) {
                                Game.getGames({id: team[0].id_team._id}).$promise.then(function (games) {
                                    $scope.games = games;
                                });
                            }

                        }

                    });


                case 'fan':
                case 'league':
                case 'media':

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

        /**
         * @ngdoc method
         * @name checkIfTodayDate
         * @methodOf abroadathletesApp.controller:HomeCtrl
         * @param {Date} date Check If Today Date
         * @returns {boolean} Return true or false if today Date
         *
         */

        $scope.checkIfTodayDate = function(date) {

            var date1 = new Date(date);
            var today = new Date();

            if (today.toDateString() == date1.toDateString()) {
                return 'Live Now';
            } else {
                return date;
            }
        };

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

        /**
         * @ngdoc method
         * @name showTable
         * @methodOf abroadathletesApp.controller:HomeCtrl
         * @param {string} string Type table
         *
         */

        $scope.showTable = function(type) {
            if(type ==='gamesTable') {
                $scope.gamesTable = true;
                $scope.eventsTable = false;
            } else if (type ==='eventsTable') {
                $scope.gamesTable = false;
                $scope.eventsTable = true;
            }
        };

        /**
         * @ngdoc method
         * @name showTrackingModal
         * @methodOf abroadathletesApp.controller:HomeCtrl
         *
         */

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
