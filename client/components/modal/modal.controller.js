'use strict';

angular.module('abroadathletesApp')
  .controller('ModalCtrl', function ($scope, $timeout, Upload, User) {
    User.get().$promise.then(function (me) {
      if (!me.profilePhoto || me.profilePhoto === 'default')
        me.profilePhoto = '../assets/user.png';
      $scope.user = me;
    });
    $scope.submit = function(event) {
        User.putDataFromCreator($scope.user);
        $scope.upload($scope.files);
        $scope.modal.buttons[0].click(event,$scope.user);
    };

    $scope.addTrait = function() {
      if($scope.user.kind === "player") {
        $scope.user.player.traits = $scope.user.player.traits || [];
        $scope.user.player.traits.push("");
      }
      if($scope.user.kind === "coach") {
        $scope.user.coach.traits = $scope.user.coach.traits || [];
        $scope.user.coach.traits.push("");
      }
    };

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: '/api/uploads',
            //fields: {'username': $scope.username},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    };
  });
