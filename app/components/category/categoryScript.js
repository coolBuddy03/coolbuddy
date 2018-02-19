'use strict';

(function() {
    var categoryCtrl = function($scope, $routeParams, utils, $location, showToast) {
        console.log("Category Ctrl");
        console.log($routeParams.loc);
        console.log($routeParams.bran);
        $scope.bIndex = $routeParams.bran;
        $scope.lIndex = $routeParams.loc;
        $scope.categoryList = [];
        $scope.isProcessing = true;
        // $scope.lName = "test";
        $scope.showData = false;

        utils.getCatalogData().then(function(response) {
            console.log(response);
            if ($routeParams.loc > response.data.locations.length || $routeParams.loc < 0) {
                showToast.display('Please Select Valid Location');
                $location.path('/');
                $location.search({});
                return;
            }
            if ($routeParams.bran > response.data.locations[$routeParams.loc].branches.length || $routeParams.bran < 0) {
                showToast.display('Please Select Valid Branch');
                $location.path('/');
                $location.search({});
                return;
            }
            if ($routeParams.loc > -1 && $routeParams.bran > -1) {
                console.log("From Branch");
                $scope.locationName = response.data.locations[$routeParams.loc].name;
                $scope.branchName = response.data.locations[$routeParams.loc].branches[$routeParams.bran].name;
                $scope.categoryList = $scope.categoryList.concat(response.data.locations[$routeParams.loc].branches[$routeParams.bran].categories);
            } else {
                console.log("From Location");
                $scope.locationName = response.data.locations[$routeParams.loc].name;
                response.data.locations[$routeParams.loc].branches.forEach(function(item) {
                    $scope.categoryList = $scope.categoryList.concat(item.categories);
                });
            }
            console.log($scope.categoryList);
            $scope.isProcessing = false;
            $scope.showData = true;
        });
        $scope.showSubcategory = function(categoryIndex) {
            if ($routeParams.loc > -1 && $routeParams.bran > -1) {
                $location.path('/category-detail/');
                $location.search({ loc: $routeParams.loc, bran: $routeParams.bran, cin: categoryIndex });
            } else {
                $location.path('/category-detail/');
                $location.search({ loc: $routeParams.loc, cin: categoryIndex });
            }
        }
    };

    var categorydetailCtrl = function($scope, $routeParams, utils) {
        console.log("Category Detail Screen");
        $scope.categoryList = [];
        $scope.showData = false;
        $scope.isProcessing = true;
        utils.getCatalogData().then(function(response) {
            console.log(response);
            if ($routeParams.bran > -1) {
                console.log("Three Query parameters");
                $scope.locationName = response.data.locations[$routeParams.loc].name;
                $scope.branchName = response.data.locations[$routeParams.loc].branches[$routeParams.bran].name;
                $scope.categoryName = response.data.locations[$routeParams.loc].branches[$routeParams.bran].categories[$routeParams.cin].name;
                $scope.categoryList = response.data.locations[$routeParams.loc].branches[$routeParams.bran].categories[$routeParams.cin];
            } else {
                console.log("Two Query Parameters");
                response.data.locations[$routeParams.loc].branches.forEach(function(item) {
                    $scope.categoryList = $scope.categoryList.concat(item.categories);
                });
                $scope.categoryList = $scope.categoryList[$routeParams.cin];
                $scope.locationName = response.data.locations[$routeParams.loc].name;
                $scope.categoryName = $scope.categoryList.name;
                // $scope.categoryName = $scope.categoryList[$routeParams.cin].name;
            }
            console.log($scope.categoryList);
            $scope.isProcessing = false;
            $scope.showData = true;
            console.log($scope.showData);
        });
    };

    rentalManagementApp.controller('CategoryCtrl', ['$scope', '$routeParams', 'utils', '$location', 'showToast', categoryCtrl]);
    rentalManagementApp.controller('CategoryDetailCtrl', ['$scope', '$routeParams', 'utils', categorydetailCtrl]);

}());