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

	function b64EncodeUnicode(str) {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
	}

	// File size calculation
	$scope.fileSize = function (file) {
		return atob(file.data).length;
	};

	$scope.download = function (file) {
		var blob;
		switch (type) {
			case 'text':
				blob = new Blob([atob(file.data)], {type: file.mime});
				saveAs(htmlDocx.asBlob(atob(file.data)), file.name);
				break;
			case 'html':
				blob = new Blob([atob(file.data)], {type: 'text/html'});
				saveAs(blob, file.name);
				break;
			case 'image':
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
				break;
		}
		if (file.type != 'image') {
			var blob = new Blob([atob(file.data)], {type: file.mime});
			console.log(htmlDocx.asBlob(atob(file.data)));
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
		var editModal = $modal.open({
			templateUrl: '/partials/edit.html',
			controller: 'editCtrl',
			resolve: {
				document: function () {
					return file;
				}
			}
		});
	};

	$scope.upload = function () {
		var uploadModal = $modal.open({
			templateUrl: '/partials/upload.html',
			controller: 'uploadCtrl'
		});
	};
}]);
