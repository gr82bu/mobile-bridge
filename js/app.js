'use strict';
angular.module('mbApp.services', []).factory('fileStorage', ['$rootScope', function ($rootScope) {
    var fileStorage;
    if(typeof(Storage) !== "undefined") {
        fileStorage = angular.fromJson(localStorage.getItem("mbData"));
        if (!fileStorage) {
            fileStorage = [
                {
                    "id": 1,
                    "name": "index.html",
                    "type": "html",
                    "size": 11,
                    "content": '<div class="test"></div>'
                },
                {
                    "id": 2,
                    "name": "info.txt",
                    "type": "text",
                    "size": 12,
                    "content": "Hello World!"
                },
                {
                    "id": 3,
                    "name": "photo.png",
                    "type": "image",
                    "size": 13,
                    "content": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAAEVCAYAAACLyotJAAAgAElEQ…+FI9AB5IhaCNLNG1NwkKxjKaT8vh29eLeqZwCqnOXu/wdJmecUMQLFwQAAAABJRU5ErkJggg=="
                }
            ];
            try {
                localStorage.setItem("mbData", angular.toJson(fileStorage));
            }
            catch (e) {
                window.alert('Storage failed: ' + e + '\n You won\'t be able to edit or add new files');
            }
        }
    }
    else {
        window.alert('Your browser does not support localStorage, you won\'t be able to edit or add new files');
    }

    $rootScope.$watch(function () { return fileStorage; }, function (newVal) {
        localStorage.setItem("mbData", angular.toJson(newVal));
    });
    return fileStorage;
}]);

angular.module('mbApp.controllers', []).controller('indexCtrl', ['$scope', 'fileStorage', function($scope, fileStorage) {
    $scope.files = fileStorage;
    $scope.fileSize = function (file) {
        var text = 1338;
        return (text + file.content.length) / 1000;
    }
}]);

angular
    .module('mbApp', [
        'mbApp.controllers',
        'mbApp.services',
        'ui.router',
        'facebook'
    ])
    .config([
        '$stateProvider',
        'FacebookProvider',
        function ($stateProvider, FacebookProvider) {
            FacebookProvider.init('821914054533130');
            $stateProvider
                .state('index', {
                    url: '',
                    controller: "indexCtrl",
                    templateUrl: "partials/index.html"
                })
        }])
    .run([
        '$rootScope',
        function ($rootScope) {
            //Facebook.getLoginStatus(function(response) {
            //    if(response.status === 'connected') {
            //        $rootScope.loggedIn = true;
            //    } else {
            //        Facebook.login(function(response) {
            //            // Do something with response.
            //            debugger;
            //
            //        });
            //    }
            //});
        }]);
