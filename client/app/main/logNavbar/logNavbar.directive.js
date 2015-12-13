'use strict';

angular.module('abroadathletesApp')
  .directive('logNavbar', function ($window) {
    return {
      templateUrl: 'app/main/logNavbar/logNavbar.html',
      restrict: 'EA',
      controller: function($scope, $http, $location, $mdToast, Auth, $localStorage) {

        $scope.loginUser = {};
        $scope.loginErrors = {};
        if ($localStorage['remember']) {
          $scope.loginUser['remember'] = true;
        }
        $scope.login = function (form) {
          $scope.loginSubmitted = true;

          if (form.$valid) {
            Auth.login({
              email: $scope.loginUser.email.toLowerCase(),
              password: $scope.loginUser.password
            })
              .then(function () {
                // Logged in, redirect to home
                $location.path('/home');
              })
              .catch(function (err) {
                $scope.loginErrors.other = err.message;
              });
          }
          else {
            showSimpleToast();
          }
          $scope.isFalse = $scope.loginForm.email.$error.required || $scope.loginForm.password.$error.required || $scope.loginSubmitted;
        };

        var showSimpleToast = function() {
          $mdToast.show(
            $mdToast.simple()
              .content('Enter a valid email addres or password!')
              .position('right top')
              .hideDelay(2000)
          );
        };



      },
      link: function (scope, element, attrs) {
        var el = angular.element('.main-container')[0],
            topElem = angular.element('#top')[0],
            nav = angular.element('.log-nav')[0];
          //keypress

          angular.element('.registerForm').find('input').bind('keypress keyup', function(){
              if (angular.element(this).val().length > 0) {
                  angular.element(this).css('background-color','#858182');
              } else {
                  angular.element(this).css('background-color','#EAEFF1');
              }

          });
          angular.element('.loginForm').find('input').bind('keypress keyup', function(){
              if (angular.element(this).val().length > 0) {
                  angular.element(this).css('background-color','#858182');
              } else {
                  angular.element(this).css('background-color','#EAEFF1');
              }

          });
        angular.element(el).bind("scroll", function() {


          if(el.scrollTop > topElem.offsetHeight - nav.offsetHeight) {
            scope.boolChangeClass = true;
          } else {
            scope.boolChangeClass = false;
          }
        });
      }
    };
  })
