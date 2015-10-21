'use strict';

angular.module('abroadathletesApp')
    .factory('GameMessage', function ($resource) {
        return $resource('/api/message/game_message', {
            id: '@_id'
        }, {
            AddMessage: {
                method: 'POST',
                params: {}
            }
        });
    });
