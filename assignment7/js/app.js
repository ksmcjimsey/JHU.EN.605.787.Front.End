(function () {
    'use strict';

    // Set angular at the html level
    angular.module('ShoppingListApp', [])

    // Controller for text and button
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('symbol', SymbolFilter);


    // Controller 1 for the to buy list.
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {

        // Instead of exposing values through $scope we use the "this"
        // of the controller.
        var toBuy = this;
        //var totalPrice = 0.0;

        // This bound items on html gets the updated list from the service.
        toBuy.items = ShoppingListCheckOffService.getToBuyList();

        toBuy.boughtItem = function (itemIdx) {
        
            // *****Need to call the service funtion to transfer the item
            // this means remove from one list and add to the other.
            //toBuy.totalPrice = ShoppingListCheckOffService.calcTotal(itemIdx);
            ShoppingListCheckOffService.moveItemToBoughtList(itemIdx);
        }


    }


    // Controller 2 for Already Bought list.
    // Could have applied the filter here as well
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'symbolFilter'];
    function AlreadyBoughtController(ShoppingListCheckOffService, symbolFilter) {

        // Instead of exposing values through $scope we use the "this"
        // of the controller.
        var alreadyBought = this;
        var totalPrice = 0.0;

        alreadyBought.items = ShoppingListCheckOffService.alreadyBoughtList();

        alreadyBought.calcTotal = function (itemIdx) {
            //console.log ("Item Index: ", itemIdx)
            //console.log (symbolFilter(30.69));
            //return symbolFilter(ShoppingListCheckOffService.calculateTotal(itemIdx));
            return ShoppingListCheckOffService.calculateTotal(itemIdx);
        }
        

    }


    // Service shopping list service - singleton (only one copy in the app)
    function ShoppingListCheckOffService() {
        // Rename this to service.  Attach items to this to expose to 
        // outside the function.
        var service = this;

        // Variables
        var toBuyListArray = [
            { name : "cookies", quantity: 10, pricePerUnit: 3.29 },
            { name : "steak", quantity: 10, pricePerUnit: 21.99 },
            { name : "bag of potatoes", quantity: 1, pricePerUnit: 3.99 },
            { name : "corn on cob", quantity: 10, pricePerUnit: 0.25 },
            { name : "sour cream tub", quantity: 1, pricePerUnit: 2.49 }
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
                //console.log("made it ", itemIndex);
                
                // Add item to bought list
                boughtListArray.push(toBuyListArray[itemIndex]);

                // Remove item from buy list
                toBuyListArray.splice(itemIndex, 1);

            }
        }

        // one way binding to the view
        // could have called the filter here but called it in the view instead
        service.calculateTotal = function (itemIndex) {
            if (itemIndex > -1 && itemIndex < boughtListArray.length) {
                return (boughtListArray[itemIndex].quantity 
                       * boughtListArray[itemIndex].pricePerUnit).toFixed(2);
            }
        }

    }   // end of ShoppingListCheckOffService


    // Filters
    function SymbolFilter() {
        return function (input) {
            input = "$$$" + input;
            return input;
        };
    }


})();


// Steps
// 1. Set up data in service
// 2. Set up method to manage data in service
// 3. Set up controllers to use the data they need for their section
// 4. Set up the page sections to use the controllers and call the 
//    controller methods to edit the page

// Minified test
//
// (function(){'use strict';angular.module('ShoppingListApp',[]).controller('ToBuyController',ToBuyController).controller('AlreadyBoughtController',AlreadyBoughtController).service('ShoppingListCheckOffService',ShoppingListCheckOffService).filter('symbol',SymbolFilter);ToBuyController.$inject=['ShoppingListCheckOffService'];function ToBuyController(ShoppingListCheckOffService){var toBuy=this;toBuy.items=ShoppingListCheckOffService.getToBuyList();toBuy.boughtItem=function(itemIdx){ShoppingListCheckOffService.moveItemToBoughtList(itemIdx)}}
// AlreadyBoughtController.$inject=['ShoppingListCheckOffService','symbolFilter'];function AlreadyBoughtController(ShoppingListCheckOffService,symbolFilter){var alreadyBought=this;var totalPrice=0.0;alreadyBought.items=ShoppingListCheckOffService.alreadyBoughtList();alreadyBought.calcTotal=function(itemIdx){return ShoppingListCheckOffService.calculateTotal(itemIdx)}}
// function ShoppingListCheckOffService(){var service=this;var toBuyListArray=[{name:"cookies",quantity:10,pricePerUnit:3.29},{name:"steak",quantity:10,pricePerUnit:21.99},{name:"bag of potatoes",quantity:1,pricePerUnit:3.99},{name:"corn on cob",quantity:10,pricePerUnit:0.25},{name:"sour cream tub",quantity:1,pricePerUnit:2.49}];var boughtListArray=[];service.getToBuyList=function(){return toBuyListArray}
// service.alreadyBoughtList=function(){return boughtListArray}
// service.moveItemToBoughtList=function(itemIndex){if(itemIndex>-1&&itemIndex<toBuyListArray.length){boughtListArray.push(toBuyListArray[itemIndex]);toBuyListArray.splice(itemIndex,1)}}
// service.calculateTotal=function(itemIndex){if(itemIndex>-1&&itemIndex<boughtListArray.length){return(boughtListArray[itemIndex].quantity*boughtListArray[itemIndex].pricePerUnit).toFixed(2)}}}
// function SymbolFilter(){return function(input){input="$$$"+input;return input}}})()