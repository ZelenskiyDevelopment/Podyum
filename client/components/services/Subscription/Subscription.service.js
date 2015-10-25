'use strict';

angular.module('abroadathletesApp')
    .factory('Subscription', function ($http) {
        return {
            Pay: function(type, id_user,amount) {
                return $http.post('/api/subscription/pay', {
                    type: type,
                    id_user: id_user,
                    amount:amount
                }).then(function(result) {
                    return result.data;
                });
            }
        };
    });
