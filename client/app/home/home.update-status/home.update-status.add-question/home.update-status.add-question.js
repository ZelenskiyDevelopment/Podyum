'use strict';

angular.module('abroadathletesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.update-status.add-question', {
                url: '/add-question',
                controller: 'AddQuestionCtrl',
                templateUrl: 'app/home/home.update-status/home.update-status.add-question/home.update-status.add-question.html',
            });
    });
