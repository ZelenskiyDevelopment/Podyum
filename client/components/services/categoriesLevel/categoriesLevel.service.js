'use strict';

angular.module('abroadathletesApp')
    .factory('CategoriesLevel', function () {
        var level_array = {
            'level football': [
                'Youth',
                'High school',
                'College-NAIA',
                'College-Division 1',
                'College-Division 2',
                'College-Division 3',
                'Semi-pro',
                'International',
                'Professional']
        };

        level_array.football = level_array['level football']; //temporary hack for creator football name

        return {
            getCategories: function (level) {
                level = level || '';
                return _.get(level_array, level.toLowerCase(), []);
            }
        }
    });
