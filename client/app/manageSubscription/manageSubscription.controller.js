'use strict';

angular.module('abroadathletesApp').
    controller('manageSubscriptionCtrl',function($scope, User, $location, Subscription){

        $scope.userPromise = User.get().$promise;
        $scope.userPromise.then(function (me) {
            if (!me.completed) {
                $location.path('/creator');
            }
            $scope.user = me;
            $scope.friendsNumber = $scope.user.friends.length;
            $scope.followersNumber = $scope.user.followed.length;
        });

        $scope.buySubscription = function(type,amount) {

            Subscription.Pay(type,$scope.user._id,amount).then(function(data){
                console.log('success');
            })

        }
});

