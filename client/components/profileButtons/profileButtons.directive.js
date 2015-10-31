'use strict';

angular.module('abroadathletesApp')
  .directive('profileButtons', function (User, AssignModal) {
    return {
      templateUrl: 'components/profileButtons/profileButtons.html',
      restrict: 'EA',
      scope: {
        user: '=',
        owner: '='
      },
      link: function (scope, element, attrs) {
        console.log(scope.user)
        console.log(scope.owner)
        scope.friendsNumber = scope.user.friends.length;
        console.log(scope.friendsNumber);
        scope.follow = function () {
          var ID = scope.user._id;
          User.followUser({id: ID}).$promise.then(function(result){
            scope.owner.follows.push(ID);
            if(result.friends === 1) {
              var newFriend = {
                _id: ID,
                profilePhoto: scope.user.profilePhoto,
                kind: scope.user.kind
              };
              newFriend[scope.user.kind] = scope.user[scope.user.kind];
              scope.owner.friends.push(newFriend);
            }
          });

        };

        scope.unfollow = function () {
          var ID = scope.user._id;
          User.unFollowUser({id: ID});
          _.remove(scope.owner.follows, function (elem) {
            return elem === scope.user._id;
          });
        };
        scope.friend = function () {
          var ID = scope.user._id;
          User.inviteToFriends({id: ID});
          scope.owner.invited.push(ID);
        };

        scope.assign = function () {
          AssignModal.assign.open()(scope.user.kind, function (data) {
            data.id = scope.user._id;
            User.assignTo({data: data});
          });
        };

        scope.recruit = function() {
          var data = {id: scope.user._id, dtFrom: new Date()};
          User.addToTeam({data: data});
          console.log("recruit")
        };
      }
    };
  });
