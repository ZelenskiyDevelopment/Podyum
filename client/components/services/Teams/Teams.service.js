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
                updateTeam:{
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
                getAssignRequests: {
                    method: 'GET',
                    params: {
                        controller: 'getAssignRequests'
                    }
                },
                addToTeam: {
                    method: 'POST',
                    params: {
                        controller: 'addToTeam'
                    }
                },
                acceptAssignRequest: {
                    method: 'POST',
                    params: {
                        controller: 'acceptAssignRequest'
                    }
                },
                rejectAssignRequest: {
                    method: 'POST',
                    params: {
                        controller: 'acceptAssignRequest'
                     }
                },
                getAllTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getAllTeam'
                    }
                }

                });
    });