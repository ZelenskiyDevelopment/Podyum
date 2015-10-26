'use strict';

angular.module('abroadathletesApp')
  .factory('GamePositions', function () {
    var positionsInSports = {
      'basketball': [
        'Point guard',
        'Shooting guard',
        'Small forward',
        'Power forward',
        'Center'
      ],
      'american football': [
        'Quarterback',
        'Center',
        'Runningback',
        'Fullback',
        'Wide receiver',
        'Tight end',
        'Left guard',
        'Right guard',
        'Left tackle',
        'Right tackle',
        'Defensive tackle',
        'Defensive end',
        'Linebacker',
        'Safety',
        'Cornerback']
    };
    positionsInSports.football = positionsInSports['american football']; //temporary hack for creator football name
    return {
      getPositionsForSport: function (sportName) {
        sportName = sportName || '';
        return _.get(positionsInSports, sportName.toLowerCase(), []);
      }
    }
  });
