'use strict';

angular.module('abroadathletesApp').service('dataLoader', function($http) {

  /**
   * @param {string} collectionName
   * @param {object} [queryParameters = '']
   * @returns {HttpPromise}
   */
  this.get = function(collectionName, queryParameters) {
    queryParameters = queryParameters || "";
    return $http.get('/api/' + collectionName + '/' + queryParameters);
  };

  /**
   * @param {string} collectionName
   * @param {object} [queryParameters = '']
   * @param {object} [payload]
   * @returns {HttpPromise}
   */
  this.post = function(collectionName, queryParameters, payload) {
    queryParameters = queryParameters || "";
    return $http.post('/api/' + collectionName + '/' + queryParameters, payload);
  };

  /**
   * @param {string} collectionName
   * @param {object} [queryParameters = '']
   * @param {object} [payload]
   * @returns {*|Function|boolean|HttpPromise|null}
   */
  this.delete = function(collectionName, queryParameters, payload) {
    queryParameters = queryParameters || "";

    return $http.delete('/api/' + collectionName + '/' + queryParameters, payload);
  };


});
