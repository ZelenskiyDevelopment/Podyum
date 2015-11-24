'use strict';

angular.module('abroadathletesApp')
    .controller('CreatorCtrl', function ($scope, $timeout, User, $window, Upload, $location, sports, $state, $http, Teams, $filter) {

        $scope.progressValue = 10;

        $scope.countries = [
            "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
            "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
            "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
            "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina",
            "Botswana", "Bouvet Island", "Brazil",
            "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
            "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
            "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo",
            "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba",
            "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
            "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)",
            "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia",
            "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece",
            "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea",
            "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)",
            "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq",
            "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya",
            "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan",
            "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
            "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of",
            "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique",
            "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of",
            "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
            "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger",
            "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau",
            "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
            "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation",
            "Rwanda", "Saint Barthelemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia",
            "Saint Martin (French Part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
            "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
            "Sint Maarten (Dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
            "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
            "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic",
            "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste",
            "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
            "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
            "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu",
            "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.",
            "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
        ].map(function (country) { return { abbrev: country }; });

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
        $scope.formData.photo = [];
        $scope.positions = [];
        $scope.myTeams = [];
        $scope.myLeagues = [];
        $scope.titles = ['Assistant', 'Head coach'];


        User.get().$promise.then(function (me) {
            $scope.formData.firstName = me.firstName;
            $scope.formData.lastName = me.lastName;
            $scope.formData.sex = me.sex;
            if (me.birthday != undefined) {

                $scope.formData.birthday = $filter('date')(me.birthday, 'yyyy-MM-dd');
            }

        });


        $scope.beginCreating = function() {
            return $location.path()==='/creator';
        };



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
            var President = [];
            var AthleticDirector = [];
            var HeadCoach = [];
            var CitizenShip = [];

            if ($scope.formData.citizenship.length > 0) {
                angular.forEach($scope.formData.citizenship, function(value,key){
                    CitizenShip.push({
                        name: value.name
                    })
                });
            }

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
                                name: value
                            });
                        });
                    }

                    if ($scope.formData.awards.length > 0) {
                        angular.forEach($scope.formData.awards ,function(value,key){
                            AwardsPlayer.push({
                                name: value
                            });
                        });


                    }

                    if ($scope.formData.collegeLevels.length > 0) {
                        //angular.forEach($scope.formData.collegeLevels ,function(value,key){
                            CollegeLevels.push({
                                name: $scope.formData.collegeLevels
                            });
                      //  });

                        console.log(CollegeLevels);
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
                                name: value,
                                year: $scope.formData.years[key]

                            });
                        });
                        console.log(CategoriesLevel);
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
                            collegeLevels: CollegeLevels,
                            citizenship: CitizenShip
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



                    UserUpdate = {
                        teamExecutive: {
                            bio: $scope.formData.bio,
                            hometown: $scope.formData.hometown,
                            citizenship: CitizenShip
                        },
                        firstName: $scope.formData.firstName,
                        lastName: $scope.formData.lastName,
                        birthday: $scope.formData.birthday,
                        sex: $scope.formData.sex,
                        kind: $scope.formData.type,
                        sport: $scope.formData.sport_type,
                        completed: true,
                        country: $scope.formData.country
                    }


                    break

                case "league":

                    UserUpdate = {
                        leagueExecutive: {
                            bio: $scope.formData.bio,
                            hometown: $scope.formData.hometown,
                            citizenship: CitizenShip
                        },
                        firstName: $scope.formData.firstName,
                        lastName: $scope.formData.lastName,
                        birthday: $scope.formData.birthday,
                        sex: $scope.formData.sex,
                        kind: $scope.formData.type,
                        sport: $scope.formData.sport_type,
                        completed: true,
                        country: $scope.formData.country
                    };


                    break

                case "coach":

                    if (angular.isObject($scope.formData.selectedTeam)) {
                        var team = {
                            id_user: $scope.formData.id,
                            _id: $scope.formData.selectedTeam.id
                        };
                        Teams.updateTeam(team).$promise.then(function(){

                        });
                    }

                    UserUpdate = {
                        coach: {
                            bio: $scope.formData.bio,
                            hometown: $scope.formData.hometown,
                            citizenship: CitizenShip,
                            title: $scope.formData.title
                        },
                        firstName: $scope.formData.firstName,
                        lastName: $scope.formData.lastName,
                        birthday: $scope.formData.birthday,
                        sex: $scope.formData.sex,
                        kind: $scope.formData.type,
                        sport: $scope.formData.sport_type,
                        completed: true,
                        country: $scope.formData.country
                    };

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

            if (type === 'player') {
                $scope.formData.otherAwards = null;
                $scope.formData.otherCategories = null;
                $scope.formData.categoriesLevel = [];
                $scope.formData.years = [];
                $scope.formData.awards = [];
                $scope.formData.collegeLevels = [];
            }

            if (type === 'team') {
                $scope.formData.athleticDirector = [];
                $scope.formData.headCoach  = [];
                $scope.formData.president = [];
            }

            if (type === 'league') {

                $scope.formData.executive = [];

            }
            if(type==='media') {
                $scope.formData.writers = [];
                $scope.formData.tags = [];
            }
            User.get().$promise.then(function (me) {

                if (type === 'player' || type==='coach' || type==='fan') {
//                    User.getAllTeams({id: me._id}).$promise.then(function (result) {
//                        $scope.allTeams = result;
//                    });

                    Teams.getAllTeam().$promise.then(function (result) {
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


    });
