'use strict';
angular.module('mbApp.controllers').controller('indexCtrl', ['$scope', '$stateParams', '$modal', 'fileStorage', 'Facebook', function($scope, $stateParams, $modal, fileStorage, Facebook) {

	$scope.filterByName = function () {
		$scope.files = _.filter(_.sortBy(fileStorage, 'name'), function (obj) {
			return obj.name.search($scope.filter)>-1;
		});
	};

	// Bookmarks mechanism
	$scope.$watch('bookmarks', function (val) {
		var files = val ? _.where(fileStorage, {bookmarked: true}) : fileStorage;
		$scope.files = _.sortBy(files, 'name');
	});

	function fileDataUrl(file) {
		return 'data:' + file.mime + ';base64,' + file.data;
	}
	// File size calculation
	$scope.fileSize = function (file) {
		return atob(file.data).length;
	};

	$scope.download = function (file) {
		if (file.mime.search('text')>-1) {
			var blob = new Blob([atob(file.data)], {type: file.mime});
			saveAs(blob, file.name);
		}
		else {
			var ctx,
				img = new Image,
				canvas = document.createElement("canvas");
			img.src = fileDataUrl(file);
			canvas.width = img.width;
			canvas.height = img.height;
			ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			canvas.toBlob(function (blob) {
				saveAs(blob, file.name);
			});
		}
	};

	$scope.bookmark = function (file) {
		file.bookmarked = file.bookmarked ? false : true;
	};

	$scope.preview = function (file) {

	};

	$scope.edit = function (file) {

	};

	$scope.upload = function () {
		var uploadModal = $modal.open({
			templateUrl: '/partials/upload.html',
			controller: 'uploadCtrl'
		});
	};

	$scope.uploadFB = function () {
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
	}
}]);
