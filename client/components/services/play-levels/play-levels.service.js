'use strict';

angular.module('abroadathletesApp')
  .factory('PlayLevels', function () {
    var commonPlayLevels = [
      'Youth',
      'High school',
      'College-NAIA',
      'College-Division 1',
      'College-Division 2',
      'College-Division 3',
      'Semi-pro',
      'International',
      'Professional'
    ];

    var directPlayLevels = {
      football: [
        'College-D1 FBS',
        'College-D1-FCS',
        'College-NAIA-FBS',
        'College-NAIA-FCS',
        'College-D2-FBS',
        'College-D2-FCS',
        'College-D3-FBS',
        'College-D3-FCS'
      ],
      basketball: []
    };


    return {
      getPlayLevels: function (sport) {
        return commonPlayLevels.concat(_.get(directPlayLevels, sport, []));
      }
    };
  });
