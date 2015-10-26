'use strict';

angular.module('abroadathletesApp')
  .filter('timerDisplay', function () {
    return function (input) {
      var min = Math.floor(input/60);
      var sec = input%60;
      var result = '';
      if(min < 10) {
        result = result + '0' + min;
      }
      else {
        result = result + min;
      }
      if(sec < 10)
        result = result + ':0' + sec;
      else
        result = result + ':' + sec;
      return result;
    };
  });
