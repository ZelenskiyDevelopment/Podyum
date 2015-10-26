'use strict';

angular.module('abroadathletesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.common-story', {
        url:'',
        templateUrl: 'app/profile/common/profile.common.story/profile.common.story.html',
        controller: 'ProfileCommonStoryCtrl'
      });
  });
