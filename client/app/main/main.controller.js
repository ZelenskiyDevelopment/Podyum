'use strict';

angular.module('abroadathletesApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, $window, $localStorage, $anchorScroll, $mdToast) {

    $scope.chosenFeature = 'player';
    $scope.chosenSection = 'section';

    $scope.images = [
      //"assets/images/mainpageslides/mainfootball2.jpg",
      //"assets/images/mainpageslides/mainfootball1.jpg",
      "assets/images/mainpageslides/main-banner-img.jpg"
    ];

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

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    if($localStorage['token'] && !$localStorage['try']) {
      $location.path('/home');
      $localStorage['try'] = true;
    }

    $scope.myInterval = 4000;
    $scope.slides = [{image: 'assets/images/mainpageslides/slide1.png'},
      {image: 'assets/images/mainpageslides/slide2.png'},
      {image: 'assets/images/mainpageslides/slide3.png'}
    ];

    $scope.remember = function(value){
      $localStorage['remember'] = value;
    };

    $scope.changeFeature = function(choice) {
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
    }


    $scope.changeSection = function() {
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

    $scope.changePricing = function() {
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