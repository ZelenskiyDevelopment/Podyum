'use strict';

angular.module('abroadathletesApp')
  .factory('Milestone', function ($resource) {
     // Public API here
    return $resource('/api/milestones/:id/:controller',{
      id: '@_id'
    }, {
      create: {
        method: 'POST',
        params: {}
      },
      getOwn: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'own'
        }
      }
    });
  });
