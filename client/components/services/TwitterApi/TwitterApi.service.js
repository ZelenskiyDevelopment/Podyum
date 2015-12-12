'use strict';

angular.module('abroadathletesApp')
    .factory('TwitterApi', function ($resource) {
        return $resource('/api/twitter/:id/:controller', {
            id: '@_id'
        }, {
            getUserTimeLine: {
                method: 'GET',
                isArray: true,
                params: {
                    id: '@id',
                    controller:'user_timeline'
                }
            }
        });
    });
