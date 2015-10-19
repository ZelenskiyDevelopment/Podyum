'use strict';

angular.module('abroadathletesApp')
  .factory('eventTitles', function () {
    var titles = {
      onlyText: 'status has been updated.',
      onePhoto: 'added new photo',
      manyPhoto: 'added new photos',
      video: 'shared new video',
      medal: 'awarded medal:',
      comment: 'added comment:',
      shared: 'shared post:'
    };

    return {
      getTitle: function (type) {
        return titles[type] || '';
      }
    };
  });
