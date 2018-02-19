'use strict';

/**
 *
 * Common Services
 *
 */
(function() {

    var utilsService = function($http, $q) {

        var allData = undefined;

        var getCatalogData = function() {
            var q = $q.defer();
            if (!allData) {
                $http.get('/data/catalog.json').then(function(response) {
                    console.log(response);
                    console.log("all Locations Fetched");
                    allData = response.data;
                    var temp = [];
                    angular.copy(allData, temp);
                    q.resolve(temp);
                }, function(response) {
                    console.error("Unable To Fetch");
                    console.log(response);
                    q.reject(response);
                });
            } else {
                var temp = [];
                angular.copy(allData, temp);
                q.resolve(temp);
            }
            return q.promise;
        }
        return {
            getCatalogData: getCatalogData
        }
    };
    var showToast = function($mdToast) {
        var ret = {};
        ret.display = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position('right')
                .hideDelay(3000)
            );
        }
        return ret;
    }

    rentalManagementApp.factory('utils', ['$http', '$q', utilsService]);
    rentalManagementApp.factory('showToast', ['$mdToast', showToast]);

}());

/**
 *
 * Common Filters
 *
 */
/**
 *
 * Common Controllers
 *
 */
(function() {
    var breadcrumbCtrl = function($scope, $location, $routeParams) {
        console.log($routeParams);

        $scope.locationClicked = function() {
            $location.path('/category');
            $location.search({ loc: $routeParams.loc });
        }

        $scope.branchClicked = function() {
            $location.path('/category');
            $location.search({ loc: $routeParams.loc, bran: $routeParams.bran });
        }

    }
    rentalManagementApp.controller('BreadCrumbCtrl', ['$scope', '$location', '$routeParams', breadcrumbCtrl]);
}());
/**
 *
 * Common Directives
 *
 */
(function() {
    var breadCrumbsDirective = function() {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'BreadCrumbCtrl',
            scope: {
                location: "=",
                branch: "=",
                category: "="
            },
            templateUrl: '/components/shared/templates/BreadCrumTemplate.html',
            link: function(scope, element, attrs) {}
        }
    };
    rentalManagementApp.directive('breadCrumbs', [breadCrumbsDirective]);
}());