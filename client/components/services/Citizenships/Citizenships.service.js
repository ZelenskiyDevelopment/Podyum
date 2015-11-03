'use strict';

angular.module('abroadathletesApp')
    .factory('CitizenShips', function () {
        var array = {
            'citizenships': [
                'Afghans',
                'Albanians',
                'Algerians',
                'Americans',
                'Andorrans']
        };

        array.football = array['citizenships']; //temporary hack for creator football name

        return {
            getCitizenShips: function (value) {
                value = value || '';
                return _.get(array, value.toLowerCase(), []);
            }
        }
    });
