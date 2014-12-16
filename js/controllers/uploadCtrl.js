'use strict';
angular.module('mbApp.controllers').controller('uploadCtrl', ['$scope', '$modalInstance', '$timeout', 'fileStorage', 'Facebook', function($scope, $modalInstance, $timeout, fileStorage, Facebook) {

	$scope.img = {src: ''};

	$scope.uploadFromPc = function () {
		$timeout(function() {
			angular.element('#file').trigger('click');
		});
	};

	$scope.uploadFromFb = function () {
		$scope.showAlbum = function (albumId) {
			$scope.fbAlbum = false;
			$scope.fbAlbumPhotos = true;
			Facebook.api('/'+albumId+'/photos',  function(photos) {
				$scope.photos = photos.data;
			});
		};

		$scope.previewFbPhoto = function (photoSrc) {
			$scope.fbAlbum = false;
			$scope.fbAlbumPhotos = false;
			$scope.img.src = photoSrc;
		};

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
				Facebook.api('/me/albums',  function(albums) {
					if (albums.data.length) {
						$scope.fbAlbum = true;
						$scope.albums = albums.data;
						angular.forEach(albums.data, function (obj, ind) {
							if (!obj.cover_photo) {
								$scope.albums[ind].cover = 'https://www.facebook.com/images/photos/empty-album.png';
							}
							else
								Facebook.api('/'+obj.cover_photo,  function(cover) {
									$scope.albums[ind].cover = cover.images[0].source;
								});
						});
					}
				});
			}
		});
	};

	$scope.$watch('img.src', function (dataUrl) {
	});

}]);
