'use strict';

angular.module('abroadathletesApp')
    .controller('ExploreCtrl', function ($scope, $http, $location, $window, Auth) {

        $scope.registerUser = {};
        $scope.registerErrors = {};
        $scope.news = {};
        $scope.news_page_two = {};
        $scope.news_page_three = {};
        $scope.news_nfl = 'http://www.nfl.com/ajax/news?partnerId=around-the-league&maxResults=10&batchNum=0';
        $scope.news_nfl_page_two = 'http://www.nfl.com/ajax/news?partnerId=around-the-league&maxResults=10&batchNum=10';
        $scope.news_nfl_page_three = 'http://www.nfl.com/ajax/news?partnerId=around-the-league&maxResults=10&batchNum=20';

        $http({method:'GET', url:$scope.news_nfl}).then(function(response){

            $scope.news = response.data;

        },function(response){

        });
        $http({method:'GET', url:$scope.news_nfl_page_two}).then(function(response){

            $scope.news_page_two = response.data;

        },function(response){

        });

        $http({method:'GET', url:$scope.news_nfl_page_three}).then(function(response){

            $scope.news_page_three = response.data;

        },function(response){

        });


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
                    email: $scope.registerUser.email,
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
                        angular.forEach(err.registerErrors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.registerErrors[field] = error.message;
                        });
                    });
            }

        };


    });

