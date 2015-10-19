'use strict';

angular.module('abroadathletesApp')
  .directive('photos', function (photo, Event) {
    return {
      templateUrl: 'components/photos/photos.html',
      restrict: 'EA',
      scope: {
        photosArray: '='
      },
      link: function (scope, element, attrs) {},
    controller: function($scope, galleryModal, Upload){
      $scope.noOfFilesToUpload = 0;
      $scope.uploadedFiles = [];
      $scope.openGallery = function(index){
        galleryModal.open($scope.photosArray, index);
      };

      $scope.upload = function (files) {
       if (files && files.length) {
         $scope.noOfFilesToUpload += files.length;
           for (var i = 0; i < files.length; i++) {
             var file = files[i];
               Upload.upload({
                 url: '/api/uploads/photos',
                 file: file
               }).progress(function (evt) {
                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                   console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                  }).success(function (data, status, headers, config) {
                   console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                   $scope.noOfFilesToUpload -= 1;
                   $scope.photosArray.push(data);
                   Event.create({
                       type: 'onePhoto',
                       description: '',
                       photos: data._id,
                       video: undefined
                   }).$promise.then(function(result){});
                 });
                }
            }
        };
    }
    };
  });
