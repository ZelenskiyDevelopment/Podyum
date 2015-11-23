'use strict';

angular.module('abroadathletesApp')
	.controller('ProfileTeamRosterCtrl', function($scope, sharedScope, User) {
		$scope.players = [];
		$scope.tab = 1;

			$scope.setTab = function(newTab) {
				$scope.tab = newTab;
				console.log($scope.tab);
			};

			$scope.isSet = function(tabNum) {
				return $scope.tab === tabNum;
			};
		sharedScope.myPlayers.promise.then(function(players) {
			$scope.players = players;
		});
	});