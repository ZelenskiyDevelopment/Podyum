'use strict';

angular.module('abroadathletesApp')
  .controller('ProfileCommonStoryCtrl', function ($scope, Event, $rootScope,$stateParams) {
    $scope.events = [];

     if ($stateParams.id) {
         Event.getOwnEventsById({id:$stateParams.id}).$promise.then(function (results) {
             angular.forEach(results, function(item, key){


                 angular.forEach(item.comments, function(comment, key){


                      Event.getCommentsForEvent({id:comment._id}).$promise.then(function(author){

                     //     comment.author =   author;
console.log(author);
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
         Event.getOwnEvents().$promise.then(function (results) {
             $scope.wallEvents = results;
         });
     }

  });
