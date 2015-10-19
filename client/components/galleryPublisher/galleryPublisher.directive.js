'use strict';

angular.module('abroadathletesApp')
  .directive('galleryPublisher', function () {
    return {
      templateUrl: 'components/galleryPublisher/galleryPublisher.html',
      restrict: 'EA',
      scope: {
        currentPhoto: '=',
        commentAuthor: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: function($scope, $http, photo, Comment, Event, Auth){
        $scope.addPost = function(content){
          /*if(!_.isUndefined($scope.currentPhoto.event) && !_.isNull($scope.currentPhoto.event)){
              Event.addComment({
                  id: $scope.currentPhoto.event,
                  comment: content,
                  author: $scope.commentAuthor._id
              }).$promise.then(function (result) {
                      $scope.currentPhoto.comments.push(result);
                  }, function (err) {
                      console.log(err);
                  });
          }*/
      //    else{
              if(typeof $scope.currentPhoto._id !== "undefined" && content ) {
                  Comment.create({author: $scope.commentAuthor._id, comment: content})
                      .$promise.then(function(result){
                          photo.addComment({
                              id: $scope.currentPhoto._id
                          },{
                              comment: result._id,
                              user: Auth.getCurrentUser()
                          }).$promise.then(function(response){
                                  $scope.currentPhoto.comments = response;
                              });
                      });
              }
      //    }
        }
      }
    };
  });