'use strict';

angular.module('abroadathletesApp')
  .controller('HomeCtrl', function ($scope, User, $location, socket, $mdDialog, Milestone) {
    $scope.userPromise = User.get().$promise;
    $scope.userPromise.then(function (me) {
      if (!me.completed) {
        $location.path('/creator');
      }
      $scope.user = me;
      console.log(me);
      $scope.friendsNumber = $scope.user.friends.length;
      $scope.followersNumber = $scope.user.followed.length;
     // fetchMyMilestones();
    });

   /* $scope.fetchMyMilestones = fetchMyMilestones;
    function fetchMyMilestones(){
      Milestone.getOwn({owner: $scope.user._id}).$promise.then(function(response){
        $scope.myMilestones = _.map(response, 'content');
      });
    }*/

    $scope.changeMembership = function() {
      if($scope.user.role === 'free')
        $scope.user.role = 'premium';
      else
        $scope.user.role = 'free';
      User.changeMembership({data: $scope.user.role}).$promise.then(function() {
        User.get().$promise.then(function(me) {
        });
      });
    };

    $scope.showTrackingModal = function(event){
      $mdDialog.show({
        controller: 'easyModalCtrl',
        resolve: {
          value: function () {
            return $scope.user.trackedBy;
          }
        },
        templateUrl: 'app/home/profileTracker/profileTracker.html',
        targetEvent: event,
        parent: document.body,
        clickOutsideToClose:true
      });
    };

    //function easyModalCtrl($scope, value){
    //  $scope.value = value;
    //  $scope.cancel = function() {
    //    $mdDialog.cancel();
    //  };
    //
    //  $scope.applyForJob = function(){
    //    $mdDialog.hide($scope.value);
    //  };
    //}

    //$scope.myMilestones = ["Average over 90 points per game", "Average over 20 assists per game", "1st seed in Eastern Conference", "Average less than 10 turnovers per game", "3 players average 20 points per game"];
  });
