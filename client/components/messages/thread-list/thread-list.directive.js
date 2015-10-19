'use strict';

angular.module('abroadathletesApp')
  .directive('threadList', function (Room, $stateParams) {
    return {
      templateUrl: 'components/messages/thread-list/thread-list.html',
      restrict: 'E',
      require: '^room-selector',
      scope: {
        roomId: '=',
        startThread: '=?'
      },
      link: function (scope, element, attrs, roomSelectorCtrl) {
        var threadsPromise = Room.getThreads(scope.roomId).then(function (threads) {
          roomSelectorCtrl.changeThread(_.first(threads));
          if (_.isEmpty(threads)) {
            setUpWatch(scope);
          }
          scope.threads = threads;
          return threads;
        });

        if (!_.isEmpty($stateParams.threadId)) {
          threadsPromise.then(function (result) {
            var thread = _.find(result, function (thread) {
              return thread._id === $stateParams.threadId;
            });

            if (!_.isEmpty(thread)) {
              roomSelectorCtrl.changeThread(thread);
            }
          });
        }

        function setUpWatch(scope) {
          var watch = scope.$watchCollection('threads', function (threads) {
            if (!_.isEmpty(threads)) {
              roomSelectorCtrl.changeThread(scope.startThread || _.first(threads));
              watch();
            }
          });
        }


      }
    };
  });
