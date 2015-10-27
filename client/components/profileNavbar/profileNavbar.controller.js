'use strict';

angular.module('abroadathletesApp')
	.controller('profileBarCtrl', function($scope, $location) {
		$scope.isActive = function(route) {
			$scope.path = $location.path();
			return $location.path() === route;
		}
})