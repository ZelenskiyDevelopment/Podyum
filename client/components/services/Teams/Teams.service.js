'use strict';

/**
 * @ngdoc service
 * @name abroadathletesApp.Teams
 * @description
 * # Teams
 * Service to talk with backend api.
 */

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

                /**
                 * @ngdoc
                 * @name abroadathletesApp.Teams#getTeam
                 * @methodOf abroadathletesApp.Teams
                 *
                 * @description
                 * Method to get data for the Team
                 * @example
                 * Teams.getTeam({id:id});
                 * @param {int} entity id
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */

                getTeam: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getTeam'
                    }
                },

                /**
                 * @ngdoc
                 * @name abroadathletesApp.Teams#getTeamById
                 * @methodOf abroadathletesApp.Teams
                 *
                 * @description
                 *  Method to get data for the Team by id
                 * @example
                 * Teams.getTeamById({id:id});
                 * @param {int} entity id
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */

                getTeamById: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        controller: 'getTeamById'
                    }

                },

                /**
                 * @ngdoc
                 * @name abroadathletesApp.Teams#removePlayer
                 * @methodOf abroadathletesApp.Teams
                 *
                 * @description
                 *  Method to get data for the Team by id
                 * @example
                 * Teams.removePlayer({id:id});
                 * @param {int} entity id
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */

                removePlayer: {
                    method: 'GET',
                    params: {
                        controller: 'removePlayer'
                    }
                },

                /**
                 * @ngdoc
                 * @name abroadathletesApp.Teams#getAssignRequests
                 * @methodOf abroadathletesApp.Teams
                 *
                 * @description
                 *  Get assign requests players to team
                 * @example
                 * Teams.getAssignRequests({id:id});
                 * @param {int} entity id
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */

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

                /**
                 * @ngdoc
                 * @name abroadathletesApp.Teams#addToTeam
                 * @methodOf abroadathletesApp.Teams
                 *
                 * @description
                 *  Send request to assigned in team
                 * @example
                 * Teams.addToTeam({id_user: '', id_team: '', dateFrom: new Date(), isPresent: true});
                 * @param {Object} object Data
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */

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
