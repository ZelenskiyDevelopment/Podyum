'use strict';


/**
 * @ngdoc overview
 * @name abroadathletesApp
 * @description
 * Main app
 */

angular.module('abroadathletesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngFileUpload',
  '500tech.simple-calendar',
  'ngStorage',
  'ngMaterial',
  'ngMessages',
  'youtube-embed',
  'angular-confirm',
  'angular-carousel',
  'ui.select',
  'ng-backstretch',
  'perfect_scrollbar',
  'luegg.directives',
  'cropme',
  'ngSpectrum',
  'colorpicker.module',
  'cgNotify',
  'internationalPhoneNumber',
  'ngImgCrop',
  'ui.calendar',
  'moment-picker',
  'nvd3'

])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $provide, $mdThemingProvider, $mdIconProvider) {


    $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');


    $mdThemingProvider.definePalette('amazingPaletteName', {
      '50': 'fffde7',
      '100': 'fff9c4',
      '200': 'fff59d',
      '300': 'fff176',
      '400': 'ffee58',
      '500': 'ffeb3b',
      '600': 'fdd835',
      '700': 'fbc02d',
      '800': 'f9a825',
      '900': 'f57f17',
      'A100': 'ffff8d',
      'A200': 'f8c637',
      'A400': 'f8c637',
      'A700': 'f8b735',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
      .accentPalette('amazingPaletteName');


  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, $localStorage) {
    if ($localStorage.token && $localStorage.remember) {
      $cookieStore.put('token', $localStorage.token);
    }
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }

        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, socket, $state) {

        $rootScope.$state = $state;

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        if (loggedIn) {
          var currentUserId = Auth.getCurrentUser()._id;
            console.log('user id - '+currentUserId);
          socket.emit('id', {id: currentUserId});
        }
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        }
      });
    });
        $rootScope.$on('$viewContentLoaded', function () {

            setTimeout(function(){
                $('html, body').animate({ scrollTop: 0 }, 'slow');

            },1);

        });
    Auth.isLoggedInAsync(function (loggedIn) {
      if (loggedIn) {
        if($location.$$path === '/'){
          $location.path('/home');
        } else {
          $location.path($location.$$path);
        }
      }
    });
  });



