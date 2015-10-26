'use strict';

angular.module('abroadathletesApp')
  .factory('FootballStatNames', function () {
    var statNames = {
      'rushing': [
        'ATT',
        'COMP',
        'YDS',
        'LONG',
        '20+',
        'TD',
        'FUM',
        'FUML',
        '1DN'
      ],
      'passing': [
        'ATT',
        'COMP',
        'YDS',
        'LONG',
        'TD',
        'INT',
        'SACK',
        'YDSL'
      ],
      'receiving': [
        'REC',
        'TAR',
        'YDS',
        'TD',
        'LONG',
        '20+',
        'FUM',
        'FUML',
        'YAC',
        '1DN'
      ],
      'defense': [
        'SOLO',
        'AST',
        'SACK',
        'YDSL',
        'TLOSS',
        'PD',
        'INT',
        'YDS',
        'LONG',
        'TDI',
        'FF',
        'REC',
        'TDF',
        'BK'
      ],
      'scoring': [
        'RUSH',
        'REC',
        'RET',
        'TD',
        'FG',
        'XP',
        '2PT'
      ],
      'returning': [
        'ATT',
        'YDS',
        'LONGK',
        'TDK',
        'RET',
        'RETY',
        'LONGP',
        'TDP',
        'FC'
      ],
      'kicking': [
        'FGM',
        'FGA',
        'LONG',
        '1-19',
        '20-29',
        '30-39',
        '40-49',
        '50+',
        'XPM',
        'XPA'
      ],
      'punting': [
        'PUNTS',
        'YDS',
        'LONG',
        'BP',
        'IN20',
        'TB',
        'FC',
        'RET',
        'RETY'
      ]

    };

    return {
      getStatNamesForType: function (type) {
        type = type || '';
        return _.get(statNames, type.toLowerCase(), []);
      }
    }
  });
