'use strict';

angular.module('abroadathletesApp')
  .factory('Cache', function ($q, socket) {
    var cache = {};
    var getFromCache = function (path, fn, serviceName) {
      var fullPath = serviceName + '.' + path;
      if (_.isEmpty(_.get(cache, fullPath))) {
        var promise = fn().$promise.then(function (result) {
          _.set(cache, fullPath, result);
          return result;
        });

        socket.on(path, function (data) {
          var cachedObject = _.get(cache, fullPath);
          cachedObject.push(data);
        });
        socket.on('update.' + path, function (data) {
          var cachedObject = _.get(cache, fullPath);
          var objectToUpdate = _.find(cachedObject, function (item) {
            return item._id === data._id
          });
          _.extend(objectToUpdate, data.updatedObject);
        });
        return promise;
      } else {
        return $q.when(_.get(cache, fullPath));
      }
    };
    return {
      cacheResults: function (serviceName) {
        return {
          getFromCache: function (path, fn) {
            return getFromCache(path, fn, serviceName);

          },
          getCacheObject : function(){
            return cache[serviceName];
          }
        }
      }
    };
  });
