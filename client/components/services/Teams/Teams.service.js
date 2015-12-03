'use strict';

angular.module('abroadathletesApp')
    .factory('Teams', function ($resource) {
        return $resource('/api/team/:id/:controller', {
                id: '@_id'
            },
            {
                addTeam: {
                    method: 'POST',
                    params: {
                        controller: 'addTeam'
                    }
                },
                updateTeam: {
                    method: 'POST',
                    params: {
                        id: '@id',
                        controller: 'updateTeam'
                    }
                },
                getTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getTeam'
                    }
                },
                getTeamById: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getTeamById'
                    }
                },
                removePlayer: {
                    method: 'GET',
                    params: {
                        controller: 'removePlayer'
                    }
                },
                getAssignRequests: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getAssignRequests'
                    }
                },
                getAssignRequestsToTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getAssignRequestsToTeam'
                    }
                },
                addToTeam: {
                    method: 'POST',
                    params: {
                        controller: 'addToTeam'
                    }
                },
                acceptAssignRequest: {
                    method: 'GET',
                    params: {
                        controller: 'acceptAssignRequest'
                    }
                },
                sendRequestToTeam: {
                    method: 'POST',
                    params: {
                        controller: 'sendRequestToTeam'
                    }
                },
                rejectAssignRequest: {
                    method: 'GET',
                    params: {
                        controller: 'rejectAssignRequest'
                    }
                },
                getAllTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getAllTeam'
                    }
                },
                getPlayersByTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getPlayersByTeam'
                    }
                }

            });
    });
