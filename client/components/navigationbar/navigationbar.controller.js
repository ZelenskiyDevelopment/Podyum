'use strict';

angular.module('abroadathletesApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, $location, $modal, Auth, User, socket, Teams, League) {
        $scope.isCollapsedTop = true;
        $scope.isCollapsedBottom = true;
        $scope.user = [];
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return $location.path().indexOf(route) > -1;
        };

        $scope.logout = function () {
            Auth.logout();
            $location.path('/');

        };

        $scope.invitationsNumber = 0;
        $scope.invitations = [];
        $scope.team = [];
        $scope.league = [];
        $scope.assignRequests = [];
        $scope.assignRequestsTeam = [];
        $scope.assignRequestsLeague = [];
        User.get().$promise.then(function (me) {

            if (me.completed) {

                switch (me.kind) {
                    case 'team':

                        var allRequests = {};
                        var AllRequestTeam = {};

                        Teams.getAssignRequests({id: me._id}).$promise.then(function (requests) {
                            if (requests.length) {
                                Teams.getTeamById({id: requests[0].id_team}).$promise.then(function (team) {
                                    allRequests = _.map(requests, function (request) {
                                        if (request.accepted === false) {
                                            return request;
                                        }
                                    });
                                    if (angular.isObject(allRequests[0])) {
                                        $scope.assignRequests.push({team: team[0], requests: allRequests});
                                    }
                                });
                            }
                        });

                        Teams.getTeam({id: me._id}).$promise.then(function (result) {

                            if (result.length) {
                                $scope.team = result;

                                Teams.getAssignRequestsToTeam({id: result[0]._id}).$promise.then(function (requests) {


                                    angular.forEach(requests, function (request, key) {

                                        User.getUserById({id: request.id_user}).$promise.then(function (user) {

                                            request.user = user;

                                            if (request.requestToTeam === true && request.accepted === false) {
                                                $scope.assignRequestsTeam.push(request);
                                            }

                                        });


                                    });

                                });
                            }

                        });

                        break

                    case 'league':


                        League.getLeague(me._id).then(function (result) {
                            $scope.league = result.data;
                            var allRequests = {};
                            League.getAssignRequests($scope.league[0]._id).then(function (requests) {
                                if (requests.data.length) {
                                    Teams.getTeamById({id: requests.data[0].id_team}).$promise.then(function (team) {
                                        allRequests = _.map(requests.data, function (request) {
                                            if (request.accepted === false) {
                                                return request;
                                            }
                                        });
                                        if (angular.isObject(allRequests[0])) {
                                            $scope.assignRequestsLeague.push({team: team[0], requests: allRequests});
                                        }

                                    });
                                }
                            });
                        });
                        break
                }

                $scope.user = me;

            }
        });


        $scope.notificationsNumber = 0;

        $scope.notifications = [];
        User.getNotifications().$promise.then(function (serviceNotification) {
            $scope.notifications = serviceNotification;
        });

        $scope.newNotifications = [];
        User.getNewNotifications().$promise.then(function (serviceNotification) {
            $scope.newNotifications = serviceNotification;
            if ($scope.newNotifications.length > 3) {
                $scope.notificationsNumber = 4;
            }
            else {
                $scope.notificationsNumber = $scope.newNotifications.length;
            }
        });

        $scope.updateNotifications = function () {
            User.updateNotifications();
            $scope.notificationsNumber = 0;
        };

        $scope.acceptInvitation = function (ID) {
            User.acceptInvitation({id: ID});
            _.remove($scope.invitations, function (invitation) {
                return invitation._id === ID
            });
            $scope.invitationsNumber -= 1;
        };

        $scope.rejectInvitation = function (ID) {
            User.rejectInvitation({id: ID});
            _.remove($scope.invitations, function (invitation) {
                return invitation._id === ID
            });
            $scope.invitationsNumber -= 1;
        };

        $scope.acceptAssign = function (request, index) {
            Teams.acceptAssignRequest({id: request._id}).$promise.then(function (response) {

            });
            delete $scope.assignRequests[0].requests[index];
            $scope.invitationsNumber -= 1;
        };

        $scope.acceptAssignToTeam = function (request, index) {
            Teams.acceptAssignRequest({id: request._id}).$promise.then(function (response) {

            });
            $scope.assignRequestsTeam[index] = {};
            $scope.invitationsNumber -= 1;
        };

        $scope.rejectAssignToTeam = function (request, index) {
            Teams.rejectAssignRequest({id: request._id}).$promise.then(function (response) {

            });
            $scope.assignRequestsTeam[index] = {};

        };

        $scope.rejectAssign = function (request, index) {
            Teams.rejectAssignRequest({id: request._id}).$promise.then(function (response) {

            });
            delete $scope.assignRequests[0].requests[index];

        };

        $scope.acceptAssignToLeague = function (request, index) {
            League.acceptAssignRequest(request._id).then(function (response) {

            });
            delete $scope.assignRequestsLeague[0].requests[index];
            $scope.assignRequestsLeague = [];
        };
        $scope.rejectAssignToLeague = function (request, index) {
            League.rejectAssignRequest(request._id).then(function (response) {

            });

            delete $scope.assignRequestsLeague[0].requests[index];
            $scope.assignRequestsLeague = [];
        };
        socket.on('notification', function (notification) {
            $scope.newNotifications.push(notification);
            $scope.notificationsNumber++;
        });
        socket.on('invitation', function (invitation) {
            $scope.invitations.push(invitation);
            $scope.invitationsNumber++;
        });
        socket.on('assignRequest', function (invitation) {
            $scope.assignRequests.push(invitation);
            $scope.invitationsNumber++;
        });
    });
