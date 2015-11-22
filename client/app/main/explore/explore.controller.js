'use strict';

angular.module('abroadathletesApp')
  .controller('ExploreCtrl', function ($scope, $http, $location, $window, Auth) {

    $scope.registerUser = {};
    $scope.registerErrors = {};

    $scope.register = function(form) {
      $scope.registerSubmitted = true;
      $scope.passwordConfirmed = false;
      if($scope.registerUser.passwordConfirm === $scope.registerUser.password) {
        $scope.passwordConfirmed = true;
      }
      if(form.$valid && $scope.passwordConfirmed) {
        Auth.createUser({
          firstName: $scope.registerUser.firstName,
          lastName: $scope.registerUser.lastName,
          email: $scope.registerUser.email,
          password: $scope.registerUser.password
        })
          .then( function() {
            // Account created, redirect to home
            $location.path('/home');
          })
          .catch( function(err) {
            err = err.data;
            $scope.registerErrors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.registerErrors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.registerErrors[field] = error.message;
            });
          });
      }

    };



  });

