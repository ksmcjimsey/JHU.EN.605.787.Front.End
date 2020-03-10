(function () {
    'use strict';

    // Set angular at the html level
    angular.module('ShoppingListApp', [])

    // Controller for text and button
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    // Controller 1 for the to buy list.
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {

        // Instead of exposing values through $scope we use the "this"
        // of the controller.
        var toBuy = this;

        // This bound items on html gets the updated list from the service.
        toBuy.items = ShoppingListCheckOffService.getToBuyList();
        //console.log(toBuy.items)

        toBuy.boughtItem = function (itemIdx) {
        
            // *****Need to call the service funtion to transfer the item
            // this means remove from one list and add to the other.
            ShoppingListCheckOffService.moveItemToBoughtList(itemIdx);

        }


    }


    // Controller 2 for Already Bought list.
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {

        // Instead of exposing values through $scope we use the "this"
        // of the controller.
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.alreadyBoughtList();

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

        // Function to return the Already Bought list
        service.alreadyBoughtList = function () {
            return boughtListArray;
        }

        // Function to remove item from the toBuyListArray and 
        // add it to the boughtList Array
        service.moveItemToBoughtList = function (itemIndex) {

            // If the index is in the array range then remove it
            if (itemIndex > -1 && itemIndex < toBuyListArray.length) {
                console.log("made it ", itemIndex);
                
                // Add item to bought list
                boughtListArray.push(toBuyListArray[itemIndex]);


                // Remove item from buy list
                toBuyListArray.splice(itemIndex, 1);

            }
        }

    }


})();


// Steps
// 1. Set up data in service
// 2. Set up method to manage data in service
// 3. Set up controllers to use the data they need for their section
// 4. Set up the page sections to use the controllers and call the 
//    controller methods to edit the page