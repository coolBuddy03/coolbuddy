"use strict";
(function() {
    var headerCtrl = function($scope, utils, $location) {
        console.log("header controllerr");
        $scope.loc_data_list = [];
        utils.getCatalogData().then(function(response) {
            $scope.loc_data_list = response.data.locations;
            // console.log($scope.loc_data_list);
        });
        $scope.fetchCategory = function() {
            console.log(arguments[0]);
            console.log(arguments[1]);
            switch (arguments.length) {
                case 1:
                    console.log("From Location");
                    $location.path('/category');
                    $location.search({ loc: arguments[0] });
                    break;
                case 2:
                    console.log("From Branch");
                    $location.path('/category');
                    $location.search({ loc: arguments[0], bran: arguments[1] });
                    break;
            }
        }
    };
    rentalManagementApp.controller('HeaderCtrl', ['$scope', 'utils', '$location', headerCtrl]);
}());

(function() {
    var rentalHeader = function() {
        return {
            restrict: 'EA',
            scope: {},
            replace: true,
            controller: 'HeaderCtrl',
            templateUrl: 'components/header/headerTemplate.html',
            link: function(scope, element, attrs) {}
        }
    };
    rentalManagementApp.directive('rentalHeader', [rentalHeader]);
}());