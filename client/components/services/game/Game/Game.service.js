'use strict';

angular.module('abroadathletesApp')
  .factory('Game', function ($resource) {
    return $resource('/api/games/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST',
        params: {}
      },
      get: {
        method:'GET',
        params: {

        }
      },
      getGames: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getGamesWithId'
        }
      },
      getGamesForTeams: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'getGamesForTeams'
        }
      },
      postData: {
        method: 'POST',
        params: {
          controller: 'postData'
        }
      },
      postUserData: {
        method: 'POST',
        params: {
          controller: 'postUserData'
        }
      },
      postLastIn: {
        method: 'POST',
        params: {
          controller: 'postLastIn'
        }
      },
      getAllGames: {
        method: 'POST',
        isArray: true,
        params: {
          controller:'all'
        }
      },
    });
  });
