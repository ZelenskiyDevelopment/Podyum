'use strict';

angular.module('abroadathletesApp')
  .directive('browseUsersModal', function ($mdDialog, Auth) {
    return {
      templateUrl: 'components/browseUsersModal/browseUsersModal.html',
      restrict: 'EA',
      scope: {
        type: '=',
        change: '=',
        collection: '='
      },
      transclude: true,
      link: function (scope, element, attrs) {
        scope.open = function (ev) {
          $mdDialog.show({
            controller: function ($scope, $mdDialog) {
              $scope.type = scope.type;
              $scope.collection = scope.collection;

              $scope.hide = $mdDialog.hide;
              $scope.cancel = $mdDialog.cancel;
              $scope.callFunction = function(members) {
                console.log(members)
                scope.change = members;
                $mdDialog.hide();
              }
            },
            templateUrl: 'components/browseUsersModal/modalTemplate.html',
            targetEvent: ev,
            parent: angular.element(document.body),
            disableParentScroll: false
          });
        };
      }
    };
  });
