'use strict';

angular.module('abroadathletesApp')
  .directive('browseMembersModal', function ($mdDialog, Auth) {
    return {
      templateUrl: 'components/browseMembersModal/browseMembersModal.html',
      restrict: 'EA',
      scope: {
        type: '=',
        change: '=',
        user: '=',
        team: '='
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog, User) {
              $scope.type = scope.type;
              $scope.user = scope.user;
              $scope.team = scope.team;
              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.callFunction = function(members) {
                if(scope.type === 'rosterAdmin') {
                  for(var i=0; i < members.length; i++) {
                    var data = {id: members[i]._id};
                    User.grantRosterAdmin({data: data});
                  }
                  User.getUserRosterAdmins({id: scope.user._id}).$promise.then(function(user) {
                    scope.change = user.rosterAdmins;
                  });
                }
                else if(scope.type === 'statsAdmin') {
                  for(var i=0; i < members.length; i++) {
                    var data = {id: members[i]._id};
                    User.grantStatsAdmin({data: data})
                  }
                  User.getUserStatsAdmins({id: scope.user._id}).$promise.then(function(user) {
                    scope.change = user.statsAdmins;
                  });
                }
                else if(scope.type === 'recruitMember') {
                  if(scope.user.kind === 'team') {
                    for(var i=0; i < members.length; i++) {
                      var data = {id: members[i]._id, dtFrom: new Date()};
                      User.addToTeam({data: data})
                    }
                  }
                }
                else if(scope.type === 'recruitMemberAsAdmin') {
                  for(var i=0; i < members.length; i++) {
                    var data = {id: members[i]._id, teamId: scope.team._id,dtFrom: new Date()};
                    User.addToTeamAsAdmin({data: data})

                  }
                }
                $mdDialog.hide();
              }
            },
            templateUrl: 'components/browseMembersModal/modalTemplate.html',
            targetEvent: ev,
            parent: angular.element(document.body),
            disableParentScroll: false
          });
        };
      }
    };
  });
