'use strict';

angular.module('abroadathletesApp')
  .directive('oneUserSelector', function ($filter) {
    var getName = $filter('getName');
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(contact) {
        return (angular.lowercase(getName(contact)).indexOf(lowercaseQuery) !== -1);
      };
    }
    return {
      templateUrl: 'components/one-user-selector/one-user-selector.html',
      restrict: 'E',
      scope: {
        label: '=',
        items: '=',
        selectedItem: '=',
        reset: '=?'
      },
      link: function (scope, element, attrs) {
        scope.querySearch = function (query) {
          var results = query ?
            scope.items.filter(createFilterFor(query)) : [];
          return results;
            console.log(results);
        };
        scope.reset = function () {
          scope.searchText = '';
        };
      }
    };
  });
