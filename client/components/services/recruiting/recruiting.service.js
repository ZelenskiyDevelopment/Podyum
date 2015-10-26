'use strict';

angular.module('abroadathletesApp')
  .factory('Recruiting', function ($http) {

    return {
      getAllowValues: function(field, filtering) {
        return $http.post('/api/users/getAllowValues', {
          field: field,
          match: filtering
        }).then(function(result) {
          return result.data;
        }); 
      },
      find: function(filtering) {
        return $http.post('/api/users/find', filtering)
          .then(function(result) {
            return result.data;
          }); 
      }
    };
  });
