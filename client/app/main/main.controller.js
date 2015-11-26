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
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.registerErrors[field] = error.message;
                        });


                    });
            }

        };

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

})
.controller('DatepickerCtrl', function ($scope) {
    $scope.today = function() {
        $scope.registerUser.birthday = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.registerUser.birthday = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.registerUser.birthday = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
});
