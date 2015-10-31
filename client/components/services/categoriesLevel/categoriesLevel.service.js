'use strict';

angular.module('abroadathletesApp')
    .factory('CategoriesLevel', function () {
        var level_array = {
            'level football': [
                'College',
                'Semi-Pro',
                'International',
                'Professional',
                'Other']
        };

        level_array.football = level_array['level football']; //temporary hack for creator football name

        return {
            getCategories: function (level) {
                level = level || '';
                return _.get(level_array, level.toLowerCase(), []);
            }
        }
    });
