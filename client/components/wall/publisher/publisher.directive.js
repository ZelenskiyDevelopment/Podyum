'use strict';

angular.module('abroadathletesApp')
  .directive('publisher', function (Upload, Event, $mdDialog) {
    return {
      templateUrl: 'components/wall/publisher/publisher.html',
      restrict: 'E',
      require: '^wall',
      replace: true,
      link: function (scope, element, attrs, wallCtrl) {
        scope.noOfFilesToUpload = 0;
        scope.uploadedFiles = [];
        scope.chips = [];
        scope.description = '';

        scope.upload = function (files) {
          if (files && files.length) {
            scope.noOfFilesToUpload += files.length;
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              Upload.upload({
                url: '/api/uploads/photos',
                //fields: {'username': $scope.username},
                file: file
              }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
              }).success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                scope.noOfFilesToUpload -= 1;
                scope.uploadedFiles.push(data._id);
                scope.chips.push(data.photo);
              });
            }
          }
        };

        scope.createEvent = function () {
          var getEventType = function () {
            if (scope.uploadedFiles.length === 1) {
              return 'onePhoto';
            } else if (scope.uploadedFiles.length > 1) {
              return 'manyPhoto';
            } else if (scope.video) {
              return 'video';
            } else {
              return 'onlyText';
            }
          };

          if (scope.noOfFilesToUpload === 0 && !(_.isEmpty(scope.description) && _.isEmpty(scope.uploadedFiles))) {
            var postPromise = Event.create({
              type: getEventType(),
              description: scope.description,
              photos: scope.uploadedFiles,
              video: scope.video
            }).$promise;

            postPromise.then(function (result) {
              wallCtrl.addEvent(result);
              scope.uploadedFiles = [];
              scope.chips = [];
              scope.description = '';
              scope.video = undefined;
            });
          }
        };

        scope.showAdvanced = function (ev) {

          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/wall/publisher/video_dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev
          })
            .then(function (answer) {
              scope.video = answer;
            }, function () {

            });
        };

      },
      controller: function ($scope) {
        $scope.uploadedFiles = [];

        /**
         * Call api for photo removal
         * */
        $scope.removePhoto = function(chip){
          console.log("REMOVE PHOTO");
          console.log(index);
        }
      }
    }

  });
function DialogController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}
