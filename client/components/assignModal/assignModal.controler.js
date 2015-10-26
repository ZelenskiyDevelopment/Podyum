'use strict';

angular.module('abroadathletesApp')
  .controller('AssignModal',function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'month' && ( date.getMonth() > new Date().getMonth() && date.getYear() >= new Date().getYear() ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date(0);
    };
    $scope.toggleMax = function() {
      $scope.maxDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openTo = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedTo = true;
    };
    $scope.openFrom = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedFrom = true;
    };

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1
    };

    $scope.formats = ['MM.yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);


    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i=0;i<$scope.events.length;i++){
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };
});
