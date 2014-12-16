'use strict';
angular.module('mbApp.controllers').controller('editCtrl', ['$scope', '$modalInstance', '$timeout', 'fileStorage', 'document', function($scope, $modalInstance, $timeout, fileStorage, document) {
	$scope.content = atob(document.data);
}]);