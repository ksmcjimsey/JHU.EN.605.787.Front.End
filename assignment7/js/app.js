(function () {
    'use strict';

    // Set angular at the html level
    angular.module('ShoppingListApp', [])

    // Controller for text and button
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    // Controller for the to buy list.
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {

        // Instead of exposing values through $scope we use the "this"
        // of the controller.
        var toBuy = this;

        // This bound items on html gets the updated list from the service.
        toBuy.items = ShoppingListCheckOffService.getToBuyList();
        console.log(toBuy.items)


    }


    // Controller for Already Bought list.
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {

        // Instead of exposing values through $scope we use the "this"
        // of the controller.
        var alreadyBought = this;

    }


    // Service shopping list service - singleton (only one copy in the app)
    function ShoppingListCheckOffService() {
        // Rename this to service.  Attach items to this to expose to 
        // outside the function.
        var service = this;

        // Variables
        var toBuyListArray = [
            { name : "cookies", quantity: 10 },
            { name : "steak", quantity: 10 },
            { name : "bag of potatoes", quantity: 1 },
            { name : "corn on cob", quantity: 10 },
            { name : "sour cream tub", quantity: 1 }
        ];

        var boughtListArray = [];

        // Function to return To Buy list
        service.getToBuyList = function () {
            return toBuyListArray;
        }

    }


})();


// Steps
// 1. Set up data in service
// 2. Set up method to manage data in service
// 3. Controller 