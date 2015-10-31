'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorCtrl', function ($scope, $timeout, User, $window, Upload, $location, sports, $state) {

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



        $scope.check = function(array,find) {

            if  (angular.isArray(array)) {
                if (array.length > 0) {
                    if (array[0].hasOwnProperty('name')) {
                        if (array[0].name == find) {
                            return true;
                        }
                    }
                }
            }
        }

        $scope.processForm = function() {

            $scope.finalData = {};
            $scope.finalData.type = $scope.formData.type;

            var assignto = [];
            var myLeagues = [];
            var UserUpdate = {};
            var positionPlayer = [];
            var AwardsPlayer = [];
            var CategoriesLevel = [];
            var CollegeLevels = [];
            var Executive = [];
            var Presidet = [];
            var AthleticDirector = [];
            var HeadCoach = [];

            switch ($scope.formData.type) {

                case "player":

                    if ($scope.formData.sportData[0].data.positions.length > 0) {
                        angular.forEach($scope.formData.sportData[0].data.positions ,function(value,key){
                            positionPlayer.push({
                                name: value.name
                            })
                        });
                    }

                    if ($scope.formData.otherAwards  != null) {
                        angular.forEach($scope.formData.otherAwards.split(','), function(value,key){
                            $scope.formData.awards.push({
                                name:value
                            });
                        });
                    }

                    if ($scope.formData.awards.length > 0) {
                        angular.forEach($scope.formData.awards ,function(value,key){
                            AwardsPlayer.push({
                                name: value.name
                            });
                        });
                    }

                    if ($scope.formData.collegeLevels.length > 0) {
                        angular.forEach($scope.formData.collegeLevels ,function(value,key){
                            CollegeLevels.push({
                                name: value.name
                            });
                        });
                    }

                    if ($scope.formData.otherCategories != null) {
                        angular.forEach($scope.formData.otherCategories.split(','), function(value,key){
                            $scope.formData.categoriesLevel.push({
                                name:value
                            });
                        });
                    }

                    if ($scope.formData.categoriesLevel.length > 0) {
                        angular.forEach($scope.formData.categoriesLevel ,function(value,key){
                            CategoriesLevel.push({
                                name: value.name
                            });
                        });
                    }

                    if ($scope.formData.sportData[0].data.myTeams.length > 0) {
                        angular.forEach($scope.formData.sportData[0].data.myTeams,function(value,key) {
                            assignto.push({
                                user: value._id,
                                dateFrom: value.dateFrom,
                                dateTo: value.dateTo,
                                isPresent: value.isPresent,
                                position: positionPlayer
                            });
                        });
                    }



                    UserUpdate = {
                        player: {
                            firstName: $scope.formData.firstName,
                            lastName: $scope.formData.lastName,
                            birthday: $scope.formData.birthday,
                            position: positionPlayer,
                            bio: $scope.formData.bio,
                            number: $scope.formData.number,
                            awards: AwardsPlayer,
                            categoriesLevel:CategoriesLevel,
                            collegeLevels: CollegeLevels
                        },
                        kind: $scope.formData.type,
                        sport: $scope.formData.sport_type,
                        sex: $scope.formData.sex,
                        country:  $scope.formData.country,
                        assignedTo: assignto,
                        completed: true
                    };

                    break

                case "team":

                    if ($scope.formData.sportData[0].data.myLeagues.length > 0) {

                        angular.forEach($scope.formData.sportData[0].data.myLeagues, function(value,key){
                            myLeagues.push({
                                user:value._id
                            })
                        });
                    }


                    if ($scope.formData.athleticDirector.length > 0) {
                        AthleticDirector.push({
                            user: $scope.formData.athleticDirector._id
                        });
                    }

                    if ($scope.formData.headCoach.length > 0) {
                        HeadCoach.push({
                            user: $scope.formData.headCoach._id
                        });
                    }

                    if ($scope.formData.president.length > 0) {
                        Presidet.push({
                            user: $scope.formData.president._id
                        });
                    }

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
                        president: Presidet,
                        athleticDirector: AthleticDirector,
                        headCoach: HeadCoach,
                        myLeagues:myLeagues,
                        country: $scope.formData.country
                    }


                    break

                case "league":

                    if ($scope.formData.executive.length > 0) {
                        Executive.push({
                            user: $scope.formData.executive._id
                        });
                    }

                    UserUpdate = {
                        league: {
                            name: $scope.formData.name,
                            bio: $scope.formData.bio,
                            fans: [],
                            teams: [],
                            link: $scope.formData.link
                        },
                        founded: $scope.formData.founded,
                        kind: $scope.formData.type,
                        address: $scope.formData.address,
                        country: $scope.formData.country,
                        completed: true,
                        executive: Executive


                    }

                    break

            }

            User.updateProfile({id:$scope.formData.id,data:UserUpdate}).$promise.then(function (response){

                $location.path('/home');

            });
        };
        $scope.setType = function(type) {
            $scope.progressValue = 20;
            if(type==='player' || type==='coach' || type==='fan') {
                $scope.formData.citizenship = [];
            }

            if (type==='player') {
                $scope.formData.otherAwards = null;
                $scope.formData.otherCategories = null;
                $scope.formData.categoriesLevel = [];
                $scope.formData.athleticDirector = [];
                $scope.formData.headCoach  = [];
                $scope.formData.executive = [];
                $scope.formData.president = [];
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
            console.log(file);
            if (file) {
                Upload.upload({
                    url: '/api/uploads',
                    fields: {
                        type: file.type.split('/')[1]
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log(data.photo);
                });
            }
        };
    });
