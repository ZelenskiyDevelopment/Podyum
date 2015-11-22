'use strict';

angular.module('abroadathletesApp')
	.config(function($stateProvider) {
		$stateProvider
			.state('home.update-status.update-fans', {
				url: '/fans',
				controller: 'showQuestioCtrl',
				templateUrl: 'app/home/home.update-status/home.update-status.update-fans/home.update-status.update-fans.html'
			});
	});