'use strict';

angular.module('abroadathletesApp')
    .factory('LevelsCollege', function () {
        var level_array = {
            'level college': [
                'Division 1 (FBS)',
                'Division 1 (FCS)',
                'Division 2',
                'Division 3',
                'NAIA',
                'Junior College']
        };

        level_array.football = level_array['level college']; //temporary hack for creator football name

        return {
            getLevel: function (level) {
                level = level || '';
                return _.get(level_array, level.toLowerCase(), []);
            }
        }
    });
