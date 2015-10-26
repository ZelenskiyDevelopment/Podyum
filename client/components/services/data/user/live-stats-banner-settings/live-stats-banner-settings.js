'use strict';

angular.module('abroadathletesApp')
  .factory('liveStatsBannerSettings', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      getSettings: {
        method: 'GET',
        params: {
          controller: 'settings'
        }
      },
      postSettings: {
        method: 'POST',
        params: {
          controller: 'settings'
        }
      }
    });
  });
