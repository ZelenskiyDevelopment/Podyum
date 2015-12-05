'use strict';

angular.module('abroadathletesApp')
    .controller('ManageRosterCtrl', function ($scope, User, Auth, Teams, GamePositions, $filter) {

        $scope.athlete = {};
        $scope.players = [];



        $scope.positions =  GamePositions.getPositionsForSport('football');
        $scope.templates =
            [
                { name: 'blocks', url: 'app/manageRoster/blocks.html', viewBlocks:true},
                { name: 'lines', url: 'app/manageRoster/lines.html',  viewLines:true}
            ];
        $scope.template = $scope.templates[0];

        User.get().$promise.then(function (me) {
            $scope.user = me;
            $scope.myPlayers = $scope.user.assigned.filter(function (assignedUser) {
                return assignedUser.user.kind === 'player' && assignedUser.isPresent;
            });

            $scope.myCoaches = $scope.user.assigned.filter(function (assignedUser) {
                return assignedUser.user.kind === 'coach' && assignedUser.isPresent;
            });

            if (me.managesRoster.length > 0) {
                User.getUserManagesRoster({id: me._id}).$promise.then(function (user) {
                    $scope.myManagedRoster = user.managesRoster;
                });
            }

            Teams.getTeam({id:me._id}).$promise.then(function(result){

                $scope.team  = result;

                Teams.getPlayersByTeam({id:result[0]._id}).$promise.then(function(players){

                    $scope.players = players;

                    angular.forEach($scope.players, function(item, key){
                        if (angular.isObject(item.id_user)) {
                            item.numberPlayer = item.id_user.player.number;
                        }

                    });

//                    angular.forEach(players, function(item, key){
//                        if (item.accepted) {
//                            User.getUserById({id: item.id_user}).$promise.then(function(user){
//                                user.assigned = item;
//                                user.numberPlayer = user.player.number;
//                                $scope.players.push(user);
//
//                            });
//                        }
//                    });
                });

            });

            if (me.kind === "team") {
                User.getUserRosterAdmins({id: me._id}).$promise.then(function (user) {
                    $scope.myRosterAdmins = user.rosterAdmins;
                });
                User.getAssignRequests().$promise.then(function (users) {
                    $scope.assignRequests = _.map(users, function (user) {
                        return {
                            firstName: user.user[user.user.kind].firstName,
                            lastName: user.user[user.user.kind].lastName,
                            name: user.user[user.user.kind].name,
                            profilePhoto: user.user.profilePhoto,
                            dateFrom: new Date(user['dateFrom']),
                            dateTo: new Date(user['dateTo']),
                            isPresent: user['isPresent'],
                            position: user['position'],
                            _id: user.user._id
                        }
                    });
                    $scope.presentRequests = $scope.assignRequests.filter(function (user) {
                        return user.isPresent;
                    });
                    $scope.pastRequests = $scope.assignRequests.filter(function (user) {
                        return !user.isPresent;
                    });
                });
            }

            $scope.revokeRosterAdmin = function (ID, ind) {
                var data = {id: ID};
                $scope.myRosterAdmins.splice(ind, 1);
                User.revokeRosterAdmin({data: data});
            };

            $scope.removeFromTeam = function (index, ID) {
                if ($scope.user.kind === "team") {
                    $scope.myPlayers.splice(index, 1);
                    User.removeFromTeam({idChild: $scope.user._id, idParent: ID, isPresent: true});
                }
                else {
                    $scope.myPlayers.splice(index, 1);
                    User.removeFromTeam({idChild: $scope.user.managesRoster[$scope.chosenTeam], idParent: ID, isPresent: true});
                }
            };

            $scope.chooseTeamToManage = function (ind) {
                $scope.chosenTeam = ind;
                User.getUserByTeam({id: $scope.myManagedRoster[ind]._id}).$promise.then(function (user) {
                    $scope.myPlayers = user.assigned.filter(function (assignedUser) {
                        return assignedUser.user.kind === 'player' && assignedUser.isPresent;
                    });
                });
                User.getAssignRequestsAsAdmin({id: $scope.myManagedRoster[ind]._id}).$promise.then(function (users) {
                    $scope.assignRequests = _.map(users, function (user) {
                        return {
                            firstName: user.user[user.user.kind].firstName,
                            lastName: user.user[user.user.kind].lastName,
                            name: user.user[user.user.kind].name,
                            profilePhoto: user.user.profilePhoto,
                            dateFrom: new Date(user['dateFrom']),
                            dateTo: new Date(user['dateTo']),
                            isPresent: user['isPresent'],
                            position: user['position'],
                            _id: user.user._id
                        }
                    });
                    $scope.presentRequests = $scope.assignRequests.filter(function (user) {
                        return user.isPresent;
                    });
                    $scope.pastRequests = $scope.assignRequests.filter(function (user) {
                        return !user.isPresent;
                    });
                });
            };

            $scope.acceptAssignRequests = function (ID) {
                if (ID.name) {
                    User.acceptRecruitRequest({data: ID});
                }
                else {
                    User.acceptAssignRequests({data: ID});
                }
                if (ID.isPresent) {
                    _.remove($scope.presentRequests, function (assignRequest) {
                        return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)
                    });
                }
                else {
                    _.remove($scope.pastRequests, function (assignRequest) {
                        return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)
                    });
                }
                _.remove($scope.assignRequests, function (assignRequest) {
                    return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)
                });
                $scope.invitationsNumber -= 1;
            };

            $scope.rejectAssignRequests = function (ID) {
                if (ID.name) {
                    User.rejectRecruitRequest({data: ID});
                }
                else {
                    User.rejectAssignRequests({data: ID});
                }
                _.remove($scope.assignRequests, function (assignRequest) {
                    return (assignRequest._id === ID._id && assignRequest.dateFrom === ID.dateFrom && assignRequest.dateTo === ID.dateTo)
                });
                $scope.invitationsNumber -= 1;
            };




        });

        $scope.switch = function (type) {

            var template = findElement($scope.templates,'name',type);

            $scope.template = template;

        };

        $scope.sortChoice = 'user.player.lastName';

        $scope.changeSort = function (type) {
            if (type === $scope.sortChoice) {
                $scope.sortChoice = '-' + $scope.sortChoice;
            }
            else {
                $scope.sortChoice = type;
            }
        };

        $scope.addAthlete = function(form) {


            if (form.$valid) {

                var user = {
                    player: {
                        firstName: $scope.athlete.firstName,
                        lastName: $scope.athlete.lastName,
                        born: $scope.athlete.born,
                        birthPlace: $scope.athlete.birthPlace,
                        number: $scope.athlete.number,
                        height: $scope.athlete.height,
                        weight: $scope.athlete.weight,
                        position: $scope.athlete.position
                    },
                    email: $scope.athlete.email,
                    password: '123456',
                    kind: 'user',
                    sport: 'football',
                    sex: 'male',
                    completed: true,
                    id_team: $scope.team[0]._id

                };

                User.createUserByTeam(user).$promise.then(function () {

                    $scope.athlete.firstName = '';
                    $scope.athlete.firstName= '';
                    $scope.athlete.lastName = '';
                    $scope.athlete.position = '';
                    $scope.athlete.born = '';
                    $scope.athlete.birthPlace = '';
                    $scope.athlete.number = '';
                    $scope.athlete.height = '';
                    $scope.athlete.weight = '';
                    $scope.athlete.email = '';
                    form.$setPristine();
                    form.$setUntouched();

                    $scope.updatePlayers();
                });


            }

        };

        function findElement(arr, propName, propValue) {
            for (var i=0; i < arr.length; i++)
                if (arr[i][propName] == propValue)
                    return arr[i];
        }

        $scope.calculateAge = function(dateString) { // birthday is a date
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        };

        $scope.delete = function(id) {

            if (confirm('Delete player from Team ?')) {
                Teams.removePlayer({id:id}).$promise.then(function(response){
                    $scope.updatePlayers();
                });
            }

        };

        $scope.updatePlayers =  function () {

            $scope.players = [];

            Teams.getTeam({id:$scope.user._id}).$promise.then(function(result){

                $scope.team  = result;

                Teams.getPlayersByTeam({id:result[0]._id}).$promise.then(function(players){

                    $scope.players = players;

                    angular.forEach($scope.players, function(item, key){

                        item.id_user.numberPlayer = item.id_user.player.number;
                    });
                });

            });
        }
    });
