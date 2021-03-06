'use strict';

angular.module('abroadathletesApp')
    .controller('MainCtrl', function ($scope, $http, Auth, $location, $window, twitterService, $localStorage, $anchorScroll, $mdToast) {

        $scope.chosenFeature = 'player';
        $scope.chosenSection = 'section';

        $scope.images = [
            //"assets/images/mainpageslides/mainfootball2.jpg",
            //"assets/images/mainpageslides/mainfootball1.jpg",
            "assets/images/mainpageslides/main-banner-img.png"
        ];

        $scope.$watch(function () {
            return $window.innerHeight;
        }, function (value) {
            $scope.myHeight = value;
        });

        $scope.$watch(function () {
            return $window.innerWidth;
        }, function (value) {
            $scope.myWidth = value;
        });

        $scope.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };

        if ($localStorage['token'] && !$localStorage['try']) {
            $location.path('/home');
            $localStorage['try'] = true;
        }

        $scope.myInterval = 4000;
        $scope.slides = [
            {image: 'assets/images/mainpageslides/slide1.png'},
            {image: 'assets/images/mainpageslides/slide2.png'},
            {image: 'assets/images/mainpageslides/slide3.png'}
        ];

        $scope.carousel1Interval = 4000;
        $scope.carousel1 = [
            {image: 'assets/images/mainpageslides/carousel-item1.png', header: 'Our Feature', text: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin'},
            {image: 'assets/images/mainpageslides/carousel-item2.png', header: 'Our Feature', text: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin'},
            {image: 'assets/images/mainpageslides/carousel-item3.png', header: 'Our Feature', text: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin'}
        ];

        $scope.carousel2Interval = 4000;
        $scope.carousel2 = [
            {image: 'assets/images/mainpageslides/Happy-Young-Businessman-Carousel.png', header: 'Our Feature', text: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin'},
            {image: 'assets/images/mainpageslides/Happy-Young-Businessman-Carousel.png', header: 'Our Feature', text: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin'},
            {image: 'assets/images/mainpageslides/Happy-Young-Businessman-Carousel.png', header: 'Our Feature', text: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin'}
        ];

        $scope.remember = function (value) {
            $localStorage['remember'] = value;
        };


        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }


        $scope.authTwitter = function () {

            twitterService.connectTwitter().then(function () {
                if (twitterService.isReady()) {
                    twitterService.getLatestTweets().then(function (data) {
                        console.log(data);
                    });

                    twitterService.geUser().then(function (data) {

                        if (!localStorage.getItem("twitter-user")) {
                            localStorage.setItem("twitter-user", JSON.stringify(data));
                        }

                        var $user = JSON.parse(localStorage.getItem("twitter-user"));

                        Auth.createUser({
                            firstName: $user.name.split(' ')[0],
                            lastName: $user.name.split(' ')[1],
                            email: makeid()+'@auth',
                            password: '210716hiq',
                            twitter: {auth: true, id: $user.id}
                        })
                            .then(function () {

                                $location.path('/home');
                            })
                            .catch(function (err) {

                            });


                    });


                }

            });

        };

        $scope.changeFeature = function (choice) {
            $scope.chosenFeature = choice;
            var newHash = 'features';
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('features');
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };

        $scope.registerUser = {};
        $scope.registerErrors = {};

        $scope.register = function (form) {

            $scope.registerSubmitted = true;
            $scope.passwordConfirmed = false;
            if ($scope.registerUser.passwordConfirm === $scope.registerUser.password) {
                $scope.passwordConfirmed = true;
            }
            if (form.$valid && $scope.passwordConfirmed) {
                Auth.createUser({
                    firstName: $scope.registerUser.firstName,
                    lastName: $scope.registerUser.lastName,
                    sex: $scope.registerUser.sex,
                    birthday: $scope.registerUser.birthday,
                    email: $scope.registerUser.email.toLowerCase(),
                    password: $scope.registerUser.password
                })
                    .then(function () {
                        // Account created, redirect to home
                        $location.path('/home');
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.registerErrors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.registerErrors[field] = error.message;
                        });


                    });
            }

        };

        $scope.changeSection = function () {
            var newHash = 'section';
            console.log("ddd");
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('section');
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        }

        $scope.changePricing = function () {
            var newHash = 'pricing';
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('pricing');
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        }

    });
