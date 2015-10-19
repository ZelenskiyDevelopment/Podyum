'use strict';

angular.module('abroadathletesApp')
  .directive('user', function (Auth, User) {
    return {
      templateUrl: 'components/user/user.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      link: function (scope, element, attrs) {
        scope.me = Auth.getCurrentUser();

        scope.$watch('user', function() {
          scope.kind = _.get(scope, 'user.kind');
  
          scope.followActive = _.isEmpty(_.find(scope.me.follows, {
              id: scope.user.id
          }));
        });

        scope.follow = function() {
          scope.followActive = false;
          User.followUser({
            id: scope.user._id
          });
        };
        
        scope.unFollow = function() {
          scope.followActive = true;
          User.unFollowUser({
            id: scope.user._id
          });
        };
        
        scope.sendMessage = function() {
        };
      }
    };
  });
