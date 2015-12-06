'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileCommonStoryCtrl', function ($scope, Event, $rootScope,$stateParams, User) {
    $scope.events = [];

     if ($stateParams.id) {
         Event.getOwnEventsById({id:$stateParams.id}).$promise.then(function (results) {
             angular.forEach(results, function(item, key){


                 angular.forEach(item.comments, function(comment, key){


                      Event.getCommentsForEvent({id:comment._id}).$promise.then(function(author){

                      });
                 });
             });
             $scope.wallEvents = results;

            angular.forEach()
         });

         Event.getOwnEventsToUser({id:$stateParams.id}).$promise.then(function (results) {

             if (angular.isObject(results[0])) {
                 angular.forEach(results, function(item){
                     $scope.wallEvents.push(item);
                 });
             }

         });

     } else {

         User.get().$promise.then(function (me) {

             Event.getOwnEvents().$promise.then(function (results) {
                 $scope.wallEvents = results;
             });

             Event.getOwnEventsToUser({id:me.id}).$promise.then(function (results) {

                 if (angular.isObject(results[0])) {
                     angular.forEach(results, function(item){
                         $scope.wallEvents.push(item);
                     });
                 }

             });

         });

     }

  });
