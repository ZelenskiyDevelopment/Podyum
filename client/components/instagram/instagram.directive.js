'use strict';

angular.module('abroadathletesApp').factory('instagram', ['$http', function($http) {
	return {
		fetchPopular: function(callback) {
			var clientId = '8ac0de07da134bc7a5376e2b539c83d7'
			var userId;
			var endPoint = "https://api.instagram.com/v1/users/" + userId + "/media/recent/?client_id=" + clientId + "&callback=JSON_CALLBACK";
			$http.jsonp(endPoint).success(function(response) {
				callback(response.data);
			});
		}
	}

}]).directive('uiInstagram', function() {
	return {
		restrict: 'EA',
		templateUrl: 'components/instagram/instagram.html',
		controller: function($scope, instagram) {

			$scope.layout = 'grid';
			$scope.setLayout = function(layout) {
				$scope.layout = layout;
				console.log($scope);
			};
			$scope.isLayout = function(layout) {
				return $scope.layout == layout;
			};
			$scope.pics = [];
			instagram.fetchPopular(function(data) {

				$scope.pics = data;
			});
		}
	}
});


