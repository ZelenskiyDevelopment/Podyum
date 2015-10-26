'use strict';

angular.module('abroadathletesApp').
controller('profileBarCtrl', function($scope, $location) {
	$scope.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};
})