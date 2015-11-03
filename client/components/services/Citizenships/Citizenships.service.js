'use strict';

angular.module('abroadathletesApp')
    .factory('CitizenShips', function ($http) {
        var array = {
            'citizenships': []
        };

        $http({method: 'GET', url: '/assets/json-data/citizenships.json'}).
            success(function(data, status, headers, config) {
                angular.forEach(data, function(value,key){
                    array.citizenships.push(value.name)
                });
            }).
            error(function(data, status, headers, config) {
            });

        array.football = array['citizenships']; //temporary hack for creator football name

        return {
            getCitizenShips: function (value) {
                value = value || '';
                return _.get(array, value.toLowerCase(), []);
            }
        }
    });
