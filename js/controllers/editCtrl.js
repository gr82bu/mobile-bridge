'use strict';
angular.module('mbApp.controllers').controller('editCtrl', ['$scope', '$modalInstance', '$timeout', 'fileStorage', 'document', function($scope, $modalInstance, $timeout, fileStorage, document) {
	switch (document.type) {
		case 'text':
			$scope.content = atob(document.data);
			break;
		case 'html':
			$scope.content = atob(document.data);
			break;
		case 'image':
			$scope.dataUrl = 'data:image/png;base64,' + document.data;
			break;
	}
}]);