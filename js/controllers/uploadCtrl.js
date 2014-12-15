'use strict';
angular.module('mbApp.controllers').controller('uploadCtrl', ['$scope', '$modalInstance', 'fileStorage', 'Facebook', function($scope, $modalInstance, fileStorage, Facebook) {

	$scope.img = {src: ''};

	$scope.uploadFromPc = function () {
		$timeout(function() {
			angular.element('#file').trigger('click');
		});
	};

	$scope.uploadFromFb = function () {
		debugger;
		Facebook.getLoginStatus(function(response) {
			if(response.status === 'connected') {
				debugger;
				getAlbums();
			} else {
				Facebook.login(function(response) {
					debugger;
					getAlbums();
				});
			}
		});
	};

	$scope.$watch('img.src', function (dataUrl) {
		//debugger;
		//if (dataUrl) {
		//	var img = $document.getElementById("imgPreview");
		//	img.onload = function () {
		//		console.log(img.height);
		//		debugger;
		//	};
        //
		//}
	});

}]);
