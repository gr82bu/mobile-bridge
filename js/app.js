'use strict';

angular
    .module('mbApp', [
        'ui.router'
    ])
    .config([
        function () {

        }])
    .run([
        '$rootScope',
        '$http',
        function ($rootScope, $http) {
            $http.get('js/resource.json')
                .then(function(res){
                    debugger;
                    $rootScope.files = res.data;
                });
        }]);
