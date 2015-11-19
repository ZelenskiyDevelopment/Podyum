'use strict';

angular.module('abroadathletesApp')
  .directive('event', function (eventTitles, Event, Auth, galleryModal) {
    return {
      templateUrl: 'components/wall/event/event.html',
      restrict: 'E',
      require: '^wall',
      scope: {
        event: '='
      },
      link: function (scope, element, attrs) {
        var me = Auth.getCurrentUser();
        if(scope.event.isShared){
          scope.targetEvent = scope.event.originalEvent;
          scope.sharedEventTitle = eventTitles.getTitle(scope.event.type);
        } else {
          scope.targetEvent = scope.event;
          console.log(scope.event);
        }
        scope.isLiked = _.indexOf(scope.targetEvent.medals, me._id, true) !== -1;
        scope.isMine = me._id === scope.targetEvent.author._id;
        scope.targetEvent.title = eventTitles.getTitle(scope.targetEvent.type);

        scope.sendCongrats = function () {
          scope.targetEvent.medals.push(me._id);
          scope.isLiked = true;
          Event.sendCongrats({
            dstUserId: scope.targetEvent.author._id,
            id: scope.targetEvent._id
          });
        };

        scope.share = function () {
          Event.share({
            id: scope.event._id
          });
        };

      },
      controller: function($scope){
        $scope.openGallery = function(photos, index){
          galleryModal.open(photos, index);
        }
      }
    };
  });
