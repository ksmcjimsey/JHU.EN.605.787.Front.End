(function () {
    'use strict';

    // Set angular at the html level
    angular.module('ShoppingListApp', [])

    // Controller for text and button
    .controller('ToBuyController', ToBuyController);

    ToBuyController.$inject = ['$scope'];
    function ToBuyController($scope) {

        // Variables
        $scope.groceryListArray = [
            { name : "cookies", quantity: 10 },
            { name : "steak", quantity: 10 },
            { name : "bag of potatoes", quantity: 1 },
            { name : "corn on cob", quantity: 10 },
            { name : "sour cream tub", quantity: 1 }
        ]


        // $scope.lunchList = "";
        // $scope.message = "";
        // $scope.type = "text-success";

        // $scope.lunchCount = function () {

        //     // User has clicked the "Check If Too Much button"
        //     var lunchFoodArray = $scope.lunchList.trim().split(",");
        //     console.log(lunchFoodArray);
        //     console.log(lunchFoodArray.length);

        //     // Loop through and weed out empty items
        //     var cleanLunchArray = [];
        //     for (var c =0; c < lunchFoodArray.length; c++){
        //         if (lunchFoodArray[c].trim()) {
        //             console.log("add it");
        //             cleanLunchArray.push(lunchFoodArray[c]);
        //         }
        //     }
        //     console.log(cleanLunchArray);
        //     console.log(cleanLunchArray.length);

        //     // Set the message based on array length
        //     if ( 0 >= cleanLunchArray.length ) {
        //         $scope.message = "Please enter data first";
        //         //$scope.type = "text-danger";
        //         $scope.type = "red-color";
        //     } else if (4 > cleanLunchArray.length) {
        //         $scope.message = "Enjoy!";
        //         //$scope.type = "text-success";
        //         $scope.type = "green-color";
        //     } else {
        //         $scope.message = "To Much!";
        //         //$scope.type = "text-success";
        //         $scope.type = "green-color";
        //     }

        // }

    }


})();