(function () {
    'use strict';

    // Set angular at the html level
    angular.module('LunchApp', [])

    // Controller for text and button
    .controller('LunchController', LunchController);

    LunchController.$inject = ['$scope'];
    function LunchController($scope) {

        $scope.lunchList = "";
        $scope.message = "";
        $scope.type = "text-success";

        $scope.lunchCount = function () {

            // User has clicked the "Check If Too Much button"
            var lunchFoodArray = $scope.lunchList.trim().split(",");
            console.log(lunchFoodArray);
            console.log(lunchFoodArray.length);

            // Loop through and weed out empty items


            // Set the message based on array length
            if ( (1 >= lunchFoodArray.length) && (lunchFoodArray[0] == "") ) {
                $scope.message = "Please enter data first";
                $scope.type = "text-warning";
            } else if (4 > lunchFoodArray.length) {
                $scope.message = "Enjoy!";
                $scope.type = "text-success";
            } else {
                $scope.message = "To Much!";
                $scope.type = "text-danger";
            }

        }

    }


})();