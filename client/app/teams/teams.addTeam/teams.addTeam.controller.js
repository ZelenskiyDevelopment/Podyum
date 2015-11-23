'use strict';

angular.module('abroadathletesApp')
    .controller('AddTeamCtrl',function($scope, Team, User, Teams, $location, Upload, League, $http){


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

        $scope.colorOptions = {
            "preferredFormat": "hex"
        };

        $scope.logoTeam = null;
        $scope.croppedLogoTeam = null;
        $scope.user = [];

        $scope.logoStadium = null;
        $scope.croppedLogoStadium = null;

        $scope.allLeagues = [];
        $scope.createTeam  = [];
        /*
         * Select Logo Team
         */
        var selectLogoTeam = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.logoTeam = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        /*
         * Select Logo Stadium
         */

        var selectStadiumLogo = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.logoStadium = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        function base64ToBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        }



        angular.element(document.querySelector('#fileInputLogo')).on('change',selectLogoTeam);
        angular.element(document.querySelector('#fileInputStadium')).on('change',selectStadiumLogo);


        User.get().$promise.then(function (me) {
            User.getAllHumanUsers({id: me._id}).$promise.then(function (result) {
                $scope.allHumanUsers = result;
                $scope.allCoaches = _.filter(result, function(user){
                    return user.kind ==='coach';
                });
            });

            League.getAll().then(function(result) {
                $scope.allLeagues = result.data;
                $scope.Leagues =  result.data.map(function (league) {
                    league._lowername = league.leagueName.toLowerCase();
                    return league;
                });
            });

            $scope.user = me;
        });

        $scope.saveTeam = function() {


            var logoTeam = base64ToBlob($scope.croppedLogoTeam.replace('data:image/png;base64,',''), 'image/jpeg');

            var leagues = [];
            var  myLeagues = null,
                id_user = null;

            Upload.upload({
                url: '/api/uploads/photos',
                file: logoTeam
            }).progress(function (evt) {

            }).success(function (dataTeam, status, headers, config) {


                var logoStadium = base64ToBlob($scope.croppedLogoStadium.replace('data:image/png;base64,',''), 'image/jpeg');


                Upload.upload({
                    url: '/api/uploads/photos',
                    file: logoStadium
                }).progress(function (evt) {

                }).success(function (dataStadium, status, headers, config) {



                    if ($scope.selectedLeagues.length > 0 && angular.isArray($scope.selectedLeagues)) {

                        angular.forEach($scope.selectedLeagues, function(value,key){
                            leagues.push({
                                user:value._id
                            })
                        });
                    }

                    myLeagues  = leagues;
                    logoTeam = dataTeam.photo;
                    logoStadium = dataStadium.photo;
                    id_user = $scope.user._id;


                    var newTeam = {
                        president:  (angular.isObject($scope.president)) ? $scope.president._id : null,
                        headCoach: (angular.isObject($scope.headCoach)) ? $scope.headCoach._id : null,
                        athleticDirector:  (angular.isObject($scope.athleticDirector)) ? $scope.athleticDirector._id : null,
                        id_user:  id_user,
                        logoStadium: logoStadium,
                        myLeagues: myLeagues,
                        teamName: $scope.createTeam.teamName,
                        country: $scope.createTeam.country,
                        address: $scope.createTeam.address,
                        mascot: $scope.createTeam.mascot,
                        color: $scope.createTeam.color,
                        founded: $scope.createTeam.founded,
                        stadium: $scope.createTeam.stadium,
                        phone: $scope.createTeam.phone,
                        email: $scope.createTeam.email,
                        website: $scope.createTeam.website
                    };

               $http.post('/api/team/addTeam',newTeam).then(function(result) {
                   $location.path('/home');
                    });
//                    Teams.addTeam(newTeam).$promise.then(function(result){
//
//                   });


                });

            });

        };


        $scope.readonly = false;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.querySearch = querySearch;
        $scope.selectedLeagues = [];
        $scope.numberChips = [];
        $scope.numberChips2 = [];
        $scope.numberBuffer = '';

        /**
         * Search for vegetables.
         */
        function querySearch (query) {

            var results = query ?  $scope.Leagues.filter(createFilterFor(query)) : [];

            return results;


        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(league) {
                return (league._lowername.indexOf(lowercaseQuery) === 0);

            };

        }


    });