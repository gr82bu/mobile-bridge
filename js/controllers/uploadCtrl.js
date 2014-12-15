'use strict';
angular.module('mbApp.controllers').controller('uploadCtrl', ['$scope', '$stateParams', '$modalInstance', 'fileStorage','$timeout', 'Facebook', function($scope, $stateParams, $modalInstance, fileStorage, $timeout, Facebook) {

	//$scope.file = {src: ''};
	$scope.imgSrc = '';

	$scope.uploadFromPc = function () {
		$timeout(function() {
			angular.element('#file').trigger('click');
		});
	};

	$scope.$watch('imgSrc', function (dataUrl) {
		debugger;
		if (dataUrl) {
			angular.element('#imgPreview').src(dataUrl);
		}
	});

	//    debugger;
	//    var d = document.getElementById("fileList");
	//    if (!files.length) {
	//        d.innerHTML = "<p>No files selected!</p>";
	//    } else {
	//        var list = document.createElement("ul");
	//        d.appendChild(list);
	//        for (var i = 0; i < files.length; i++) {
	//            var li = document.createElement("li");
	//            list.appendChild(li);
	//
	//            var img = document.createElement("img");
	//            img.src = window.URL.createObjectURL(files[i]);
	//            ;
	//            img.height = 60;
	//            img.onload = function () {
	//                window.URL.revokeObjectURL(this.src);
	//            }
	//            li.appendChild(img);
	//
	//            var info = document.createElement("span");
	//            info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
	//            li.appendChild(info);
	//        }
	//    }
	//}
}]);
