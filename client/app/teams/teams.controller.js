'use strict';


/**
 * @ngdoc object
 * @name abroadathletesApp.controller:TeamsCtrl
 * @requires  $scope
 * @requires User
 * @requires $location
 * @requires Teams
 * @requires $state
 * @requires $uibModal
 * @description
 * Teams controller
 */


angular.module('abroadathletesApp')
    .controller('TeamsCtrl', function ($scope, User, Game, $location, Teams, $state, $uibModal) {


        $scope.team = [];
        $scope.user = [];
        $scope.myTeam = [];
        $scope.currentUrl = '';
        $scope.currentUrl = $state.current.url;

        $scope.checkTeam = function() {
            if($scope.team.length == 0 || $scope.myTeam.length == 0  ) {
                return true;
            } else {
                return false;
            }
        };

        User.get().$promise.then(function (me) {
            if (!me.completed) {

                $location.path('/creator');
            }


            switch(me.kind) {

                case "player":

                    Teams.getAssignRequests({id: me._id}).$promise.then(function (team) {

                        if (angular.isObject(team)) {
                            $scope.myTeam = team;
                        }

                    });

                    break


                case "team":

                    Teams.getTeam({id: me._id}).$promise.then(function (result) {

                        $scope.team = result;
                    });


            }

            $scope.user = me;

        });

        /**
         * @ngdoc method
         * @name stateChange
         * @methodOf abroadathletesApp.controller:TeamsCtrl
         * @description Go To Select State
         */

        $scope.stateChange = function () {
            $state.go($scope.stateSelected);

        };

        /**
         * @ngdoc method
         * @name isActive
         * @methodOf abroadathletesApp.controller:TeamsCtrl
         * @param {String} string Route
         * @returns {boolean} return true or false if is active route
         * @description Check if is active route
         */

        $scope.isActive = function (route) {
            return $location.path().indexOf(route) > -1;
        };

        /**
         * @ngdoc method
         * @name checkState
         * @methodOf abroadathletesApp.controller:TeamsCtrl
         * @param {String} string Route
         * @returns {boolean} return true or false if is active route
         * @description Check if is active route
         */

        $scope.checkState = function (check) {
            return $location.path().indexOf(check) > -1;
        };

        User.getMyTeams().$promise.then(function (teams) {
            $scope.teams = teams;
            console.log(teams);
        });

        $scope.assign = function (ID) {
            User.assignTo({id: ID});
            $scope.isAssign = true;
            $scope.refresh();
        };

        $scope.leave = function (ID) {
            User.leave({id: ID});
            $scope.isAssign = false;
            $scope.refresh();
        };

        $scope.existingTeam = false;


        $scope.refresh = function () {
            User.get().$promise.then(function (me) {

                if (me['assignTo']) {
                    $scope.isAssign = true;
                    $scope.me = me;
                    $scope.myTeam = _.find($scope.users, function (team) {
                        return team._id === $scope.me.assignTo;
                    });
                } else {
                    $scope.isAssign = false;
                }
            });
        };

        /**
         * @ngdoc method
         * @name joinToTeam
         * @methodOf abroadathletesApp.controller:TeamsCtrl
         * @description Open modal aialog for join to team
         */

        $scope.joinToTeam = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'joinToTeam.html',
                controller: 'joinToTeamCtrl',
                size: size
            });
        };


    })
;
