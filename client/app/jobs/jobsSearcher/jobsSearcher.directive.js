'use strict';

angular.module('abroadathletesApp').directive('jobsSearcher', function (jobs) {
  return {
    restrict: 'EA',
    scope: false,
    link: function (scope, element, attrs) {
      scope.searcher = {
        name: '',
        city: ''
      };

      scope.$watch('searcher', function () {
        var dirtyFields = getDirtyFields();
        scope.jobs = filterByMultipleFields(jobs.jobsList, scope.searcher, dirtyFields);
      }, true);

      /**
       * Note: fields in filtering and collection have to have the same keys
       * @param {array} collection
       * @param {object} filtering
       * @param {array} fields
       * @returns {array} filteredCollection
       */
      function filterByMultipleFields(collection, filtering, fields) {
        return _.reduce(fields, function (filteredCollection, field) {
          return _.filter(filteredCollection, function (element) {
            return multipleTypesFilter(element, filtering, field);
          });
        }, collection);
      }

      function multipleTypesFilter(element, filtering, field) {
        if(!_.isString(filtering[field])){
          return comparableValuesFilter(element, filtering[field], field, 'To', 'From');
        }
        else if(_.isString(element[field])){
          return stringsFilter(element[field], filtering[field]);
        }
        return false;
      }

      function stringsFilter(comparedValue, searchPhrase){
        return _.contains(comparedValue.toUpperCase(), searchPhrase.toUpperCase());
      }

      function comparableValuesFilter(comparedElement, searchedValue, filterKey, biggerValueMarkup, smallerValueMarkup){
        var reducedKey = _.contains(filterKey, biggerValueMarkup) ? filterKey.replace(biggerValueMarkup, '') : filterKey.replace(smallerValueMarkup, '');
        var comparedValue = _.isDate(searchedValue) ? new Date(comparedElement[reducedKey]) : comparedElement[reducedKey];
        if(_.contains(filterKey, biggerValueMarkup) && !!comparedValue) {
          return comparedValue <= searchedValue;
        }
        else if(_.contains(filterKey, smallerValueMarkup) && !!comparedValue) {
          return comparedValue >= searchedValue;
        }
        return false;
      }

      function getDirtyFields() {
        return _.reduce(scope.searcher, function (results, searcherFieldValue, searchedField) {
          if (searcherFieldValue) {
            results.push(searchedField);
          }
          return results;
        }, []);
      }
    }
  };
});

