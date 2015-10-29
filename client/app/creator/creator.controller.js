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

    User.get().$promise.then(function (me) {
        $scope.formData.id = me._id;
    });
    //$scope.formData.personalData = {};
    $scope.formData.sportData = [];
    $scope.formData.sportData[0] = {name:'football', data:{}};
    $scope.formData.sport = {};
    $scope.formData.sport.football = true;
    $scope.formData.sport_type = 'football';
    $scope.formData.myTeams = [];
    $scope.positions = [];
    $scope.myTeams = [];
    $scope.myLeagues = [];
    $scope.titles = ['Assistant', 'Head coach'];

    $scope.beginCreating = function() {
      return $location.path()==='/creator';
    };

    $scope.processForm = function() {

        $scope.finalData = {};
        $scope.finalData.type = $scope.formData.type;
        console.log("player");

          var assignto = [];
          var UserUpdate = {};
          var position = $scope.formData.sportData[0].data.positions[0];
          angular.forEach($scope.formData.sportData[0].data.myTeams,function(value,key) {
              assignto.push({
                  user: value._id,
                  dateFrom: value.dateFrom,
                  dateTo: value.dateTo,
                  isPresent: value.isPresent,
                  position: position.name
              });
          });

        if($scope.formData.type === 'player') {

             UserUpdate = {

                player: {
                    firstName: $scope.formData.firstName,
                    lastName: $scope.formData.lastName,
                    birthday: $scope.formData.birthday,
                    position: position.name,
                    bio: $scope.formData.bio,
                    number: $scope.formData.number
                },
                kind: $scope.formData.type,
                sport: $scope.formData.sport_type,
                sex: $scope.formData.sex,
                country:  $scope.formData.country,
                assignedTo: assignto,
                completed: true
            };


        }

        if($scope.formData.type === 'team') {


            UserUpdate = {
                team: {
                    name: $scope.formData.name,
                    bio: $scope.formData.bio,
                    fans:[],
                    color: $scope.formData.color,
                    link: $scope.formData.link,
                    mascot: $scope.formData.mascot
                },
                kind: $scope.formData.type,
                sport: $scope.formData.sport_type,
                founded: $scope.formData.founded,
                completed: true,
                stadium: $scope.formData.stadium,
                address: $scope.formData.address,
                country: $scope.formData.country
            }


        }



        User.updateProfile({id:$scope.formData.id,data:UserUpdate}).$promise.then(function (response){
            if (response == 'OK') {
                $location.path('/home');
            }
        });


    };
    $scope.setType = function(type) {
      $scope.progressValue = 20;
      if(type==='player' || type==='coach' || type==='fan') {
        $scope.formData.citizenship = [];
      }
      if(type==='media') {
        $scope.formData.writers = [];
        $scope.formData.tags = [];
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
