'use strict';

angular.module('abroadathletesApp')
  .directive('customDatepicker', function () {
    return {
      templateUrl: 'components/custom-datepicker/custom-datepicker.html',
      restrict: 'E',
      scope: {
        model: '=',
        isDisabled: '=?'
      },
      link: function (scope, element, attrs) {
        scope.isDisabled = scope.isDisabled || false;
        scope.today = function () {
          scope.model = new Date();
        };
        scope.today();

        scope.clear = function () {
          scope.model = null;
        };

        scope.disabled = function (date, mode) {
          return ( mode === 'month' && ( date.getMonth() > new Date().getMonth() && date.getYear() >= new Date().getYear() ) );
        };

        scope.toggleMin = function () {
          scope.minDate = scope.minDate ? null : new Date(0);
        };

        scope.toggleMax = function () {
          scope.maxDate = scope.minDate ? null : new Date();
        };

        scope.toggleMin();

        scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };

        scope.dateOptions = {
          formatYear: 'yyyy',
          startingDay: 1
        };

        scope.formats = ['MM.yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);

        scope.getDayClass = function (date, mode) {
          if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < scope.events.length; i++) {
              var currentDay = new Date(scope.events[i].date).setHours(0, 0, 0, 0);

              if (dayToCheck === currentDay) {
                return scope.events[i].status;
              }
            }
          }
          return '';
        };
      }
    };
  });
