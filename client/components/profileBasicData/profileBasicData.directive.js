'use strict';

angular.module('abroadathletesApp')
  .directive('profileBasicData', function() {
    return {
      templateUrl: 'components/profileBasicData/profileBasicData.html',
      restrict: 'E',
      scope: {
        user: '=',
        team: '=',
        edit: '&',
        showedit: '=',
        onclickfriend: '&',
        onclickfollow: '&',
        onclickunfollow: '&',
        onassign: '&',
        onrecruit: '&',
        onleave: '&',
        myteams: '=',
        owner: '=',
        mypresentteams: '='
      },
      link: function(scope, element, attrs) {
        console.log(scope);
        scope.$watchCollection('team', function (val) {
          console.log(val);
        })
        scope.isNotInArray = function(array, id) {
          var element = _.find(array, function(user) {
            return user._id === id;
          });
          return _.isEmpty(element);
        }
      }
    };
  });
