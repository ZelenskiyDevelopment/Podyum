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

                getTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getTeam'
                    }
                },
                getAssignRequests: {
                    method: 'GET',
                    params: {
                        controller: 'getAssignRequests'
                    }
                },
                addToTeam:{
                    method: 'POST',
                    params: {
                        controller: 'addToTeam'
                    }
                }
            });
    });