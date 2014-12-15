'use strict';
angular.module('mbApp.controllers').controller('uploadCtrl', ['$scope', '$modalInstance', '$timeout', 'fileStorage', 'Facebook', function($scope, $modalInstance, $timeout, fileStorage, Facebook) {

	$scope.img = {src: ''};

	$scope.uploadFromPc = function () {
		$timeout(function() {
			angular.element('#file').trigger('click');
		});
	};

	$scope.uploadFromFb = function () {
		//Facebook.login(function(response) {
		//	// Get user albums
		//	Facebook.api('/me/albums',  function(resp) {
		//		debugger;
		//	});
		//
		//	//Get album photos
		//	Facebook.api('/10150720583104914/photos',  function(resp) {
		//		debugger;
		//	});
		//}, {scope: 'user_photos'});

		Facebook.getLoginStatus(function(response) {
			$scope.loggedIn = response.status === 'connected';
			if (!$scope.loggedIn) {
				Facebook.login(function(response) {
					$scope.loggedIn = true;
				},{scope: 'user_photos'});
			}
		});
		$scope.$watch('loggedIn', function (status) {
			if (status) {
				Facebook.api('/me/albums',  function(resp) {
					if (resp.data.length) {
						angular.forEach(resp.data, function (obj) {
							debugger;
						});
					}
				});
			}
		});
	};

	$scope.$watch('img.src', function (dataUrl) {
	});

}]);
