'use strict';

angular.module('abroadathletesApp')
  .controller('CreatorCtrl', function ($scope, $timeout, User, $window, Upload,$location, sports, $state) {

    $scope.progressValue = 10;

    $scope.changeProgress = function(x) {
      $scope.progressValue = x;
    };

    $scope.$watch(function(){
      return $window.innerHeight;
    }, function(value) {
      $scope.myHeight = value;
    });

    $scope.$watch(function(){
      return $window.innerWidth;
    }, function(value) {
      $scope.myWidth = value;
    });




    $scope.steps = ['type','sport','photo','data','finish'];
    $scope.formData = {};
    $scope.formData.personalData = {};
    $scope.formData.sportData = [];
    $scope.formData.sportData[0] = {name:'football', data:{}};
    $scope.formData.sport = {};
    $scope.formData.sport.football = true;
    $scope.formData.myTeams = [];
    $scope.positions = [];
    $scope.myTeams = [];
    $scope.myLeagues = [];
    $scope.titles = ['Assistant', 'Head coach'];

    $scope.beginCreating = function() {
      return $location.path()==='/creator';
    };

    $scope.processForm = function() {
      if($scope.formData.type === 'player') {
        $scope.finalData = {};
        $scope.finalData.type = $scope.formData.type;
        console.log("player")
        console.log($scope.formData)
      }

    };
    $scope.setType = function(type) {
      $scope.progressValue = 20;
      if(type==='player' || type==='coach' || type==='fan') {
        $scope.formData.personalData.citizenship = [];
      }
      if(type==='media') {
        $scope.formData.personalData.writers = [];
        $scope.formData.personalData.tags = [];
      }
      User.get().$promise.then(function (me) {
        if (type === 'player' || type==='coach' || type==='fan') {
          User.getAllTeams({id: me._id}).$promise.then(function (result) {
            $scope.allTeams = result;
          });
        }
        if(type ==='team' || type==='fan') {
          User.getAllLeagues({id: me._id}).$promise.then(function (result) {
            $scope.allLeagues = result;
          });
        }
        if(type ==='league' || type ==='team') {
          User.getAllHumanUsers({id: me._id}).$promise.then(function (result) {
            $scope.allHumanUsers = result;
            $scope.allCoaches = _.filter(result, function(user){
              return user.kind ==='coach';
            });
          });
        }
      });
    };


    $scope.$on("cropme:done", function(ev, result, canvasEl) {
      $scope.formData.photo = result.croppedImage;
      $scope.upload(result.croppedImage);
    });

    if(!$scope.formData.type) {
      $state.go('creator')
    }

    $scope.upload = function (file) {
      if (file) {
        Upload.upload({
          url: '/api/uploads',
          //fields: {'username': $scope.username},
          file: file
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        });
      }
    };
  });
