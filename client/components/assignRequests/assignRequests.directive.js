'use strict';

angular.module('abroadathletesApp')
    .directive('assignRequests', function () {
        return {
          templateUrl: 'components/assignRequests/assignRequests.html',
          restrict: 'EA',
          transclude: true,
          link: function(scope, element, attrs) {},
          controller: function($scope, Teams, User, socket){

              $scope.assignRequests = [];

              User.get().$promise.then(function (me) {

                  Teams.getAssignRequests({id: me._id}).$promise.then(function (requests) {


                      $scope.assignRequests[0] = requests;

                  });

              });

              socket.on('assignRequest', function(invitation){
                  $scope.assignRequests.push(invitation);
                 // console.log(invitation);
                  //$scope.invitationsNumber++;
              });

          }
        }
    });