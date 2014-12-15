'use strict';
angular.module('mbApp.services', []);
angular.module('mbApp.controllers', []);
angular.module('mbApp.directives', []);

angular
    .module('mbApp', [
        'mbApp.controllers',
        'mbApp.services',
        'mbApp.directives',
        'ui.router',
        'ui.bootstrap',
        'facebook'
    ])
    .config([
        '$stateProvider',
        'FacebookProvider',
        function ($stateProvider, FacebookProvider) {
            FacebookProvider.init('821914054533130');
            $stateProvider
                .state('index', {
                    url: '?bookmarks',
                    controller: "indexCtrl",
                    templateUrl: "/partials/index.html"
                })
        }])
    .run([
        '$rootScope',
        function ($rootScope) {

        }]);
