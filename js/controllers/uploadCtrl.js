'use strict';
angular.module('mbApp.controllers').controller('uploadCtrl', ['$scope', '$document', '$modalInstance', 'fileStorage','$timeout', 'Facebook', function($scope, $document, $modalInstance, fileStorage, $timeout, Facebook) {

	$scope.img = {src: ''};

	$scope.uploadFromPc = function () {
		$timeout(function() {
			angular.element('#file').trigger('click');
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
