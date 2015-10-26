'use strict';

angular.module('abroadathletesApp')
  .directive('multistringSelector', function () {
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return item._lowername.indexOf(lowercaseQuery) !== -1;
      };
    }
    return {
      templateUrl: 'components/multistring-selector/multistring-selector.html',
      restrict: 'E',
      scope:{
        items:'=',
        model:'=',
        label:'='
      },
      link: function (scope, element, attrs) {
        scope.model = scope.model || [];
        scope.allItems = _.map(scope.items, function (item) {
          return {
            name: item,
            _lowername: item.toLowerCase()
          };
        });

        scope.querySearch = function (query) {
          var results = query ?
            scope.allItems.filter(createFilterFor(query)) : [];
          return results;
        };
      }
    };
  });
