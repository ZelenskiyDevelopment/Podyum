'use strict';

angular.module('abroadathletesApp')
  .factory('Team', function ($resource) {
    return $resource('/api/users/team/:id/:controller', {
        id: '@_id'
      },
      {
        getCoaches: {
          method: 'GET',
          isArray: true,
          params: {
            controller: 'couches'
          }
        },
        getPlayers: {
          method: 'GET',
          isArray: true,
          params: {
            controller: 'players'
          }
        }
      });
  });
