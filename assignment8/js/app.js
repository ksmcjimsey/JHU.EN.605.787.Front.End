// IIFE used to isolate scope from other JS code.
(function () {
    'use strict';

    // Set the angular app level
    // no ; because the controller and other angualar components
    // are dotted in afterwards.
    angular.module('NarrowItDownApp', [])

    // Controllers, Services, Filters, and Directives defined
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiForMenu', "https://davids-restaurant.herokuapp.com/menu_items.json")
    .directive('foundItemsDirective', FoundItemsDirective);


    // *** CONTROLLERS *** //
    //
    // NarrowItDownController
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        // Get 'this' value for the controller
        var narrow = this;

        // Value in the search box
        narrow.searchWord = "";
        narrow.workingArray = ["inital"];
        narrow.title = "";

        // Called with the "Narrow It Down For Me!" button is clicked.
        narrow.found = function() {
            
            // Try to set array to empty if searchWord is empty
            var promise;
            
            if (narrow.searchWord.trim() === "") {
                narrow.workingArray = [];
                return promise;
            }

            // This is a promise as well so I need to use the .then
            // so the timing is correct
            promise = MenuSearchService.getMatchedMenuItems(narrow.searchWord);
            promise.then(function (response) {
                //console.log("Response in controller: ", response);
                narrow.workingArray = response.data.menu_items;
                //console.log("narrow testArray", narrow.workingArray);
                narrow.title = narrow.searchWord 
                               + " ("+ narrow.workingArray.length + ") items found";
            })
            .catch(function (error) {
                console.log(error);
            });
            
            return promise;
        }   // End of narrow.found function

        // Remove an item from the promise data list based on the
        // index of the array element.  Seems this would easier if
        // Step 1: of slides for video 30 part 1
        narrow.removeItem = function(itemIndex) {
            // Call the service - try to contain the data in the service
            //console.log("Item Index is: ", itemIndex);
            MenuSearchService.removeItem(itemIndex);
            narrow.title = narrow.searchWord + " Results Left"
                           + " ("+ narrow.workingArray.length + ")";
        }

    }   // End of NarrowItDownController


    // *** SERVICES *** //

    // Menu search service
    MenuSearchService.$inject = ['$http', "ApiForMenu"];
    function MenuSearchService($http, ApiForMenu) {

        // Rename this
        var muService = this;

        // Data / variables
        var sc;

        //S Methods
        muService.getMatchedMenuItems = function (searchTerm) {
            //console.log("In muService.getMatchedMenuItems");

            // Use seperate variable instead of return so I can troubleshoot
            // Make the http call and get a promise back
            var finalResult = $http({
                method: "GET",
                url: (ApiForMenu)

            }).then(function success(response) {
                //console.log("Then response data: ", response.data);

                // Pass in the promise so I can return a promise
                //var subArray = calcSubArray(response.data.menu_items);
                var subPromise = calcSubArray(response, searchTerm);
                //console.log("Then subPromise value: ", subPromise);

                return subPromise;

            }, function error (response) {
                console.log("Error response: ", response);
                return response;
            });

            // console.log("finalResult Result: ", finalResult);
            return finalResult;
        }

        function calcSubArray (inputPromise, searchTerm) {

            // Short cut to promise menu array.
            //console.log("inputPromise", inputPromise);
            sc = inputPromise.data.menu_items;
            // sc[0].name="Kevin is awesome";
            //console.log("Initial array: ", inputPromise.data.menu_items);
            // console.log("Initial array: ", sc);

            //** If the searchTerm is empty return the whole list */
            if (!searchTerm) {
                return inputPromise;
            }

            // Loop through array - try decrement to preserve the index
            // If decrement does not work I'll populate a send empty array
            // if the term is found and try replacing the promise object's data
            // with the new array.
            for (var i = sc.length - 1; i >= 0; i--) {
                //console.log("For " + i + " the description is: " + sc[i].description);

                // If substring is not in description of object then remove
                if (!sc[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    //console.log(searchTerm + " not found");
                    sc.splice(i, 1);     // Removes the current element
                }

            }

            //console.log("Returned inputPromise", inputPromise);
            return inputPromise;
        }

        // Remove item service
        muService.removeItem = function (itemIdx) {
            //console.log ("Index is: ", itemIdx);
            sc.splice(itemIdx, 1);
            //console.log("sc equals: ", sc);
        };

    }   // End of MenuSearchService


    // *** DIRECTIVES *** //
    //
    // Found items directive
    // factory function that returns the ddo. Takes the 
    // template code and puts it where we call the directive
    // in the HTML file.  If it returns a ddo it is a factory function
    function FoundItemsDirective () {
        var ddo = {
            //template: "{{item.short_name}}"  Lecture 26
            templateUrl: "table.html",      // Lecture 27
            restrict: 'E',                  // Lecture 27
            scope: {                        // Lecture 28
                narrowObj: '<myList',       // No idea why the name went away between video 28 and 29.
                title: '@',
                onRemove: '&deleteItem'     // Step 2 video 30 part 1: onRemove used in child method and delete item is used in parent html template      
            },
            controller: FoundItemsDirectiveController,    // controller for the directive
            controllerAs: 'dirCtrl',        // In our partial page we can refer to this controller with dirCtrl
            bindToController: true          // the narrowObj and title show up on dirCtrl in scriptlet
        };

        return ddo;
    }   // End of FoundItemsDirective

    // Needed to add teh onRemove to pass index back to the parent to call the service.
    // Tried to get factory to work but had an error.  I think I was misisng its definition
    // at the top.  I'll try again on the next assginment if it uses a service.
    function FoundItemsDirectiveController() {
        
        var fldc = this;

        fldc.arrayIsEmpty = function () {
            //console.log ("fldc.narrowObj.workingArray.length", 
            //              fldc.narrowObj.workingArray.length);
            
            if (fldc.narrowObj.workingArray.length === 0) {
                //console.log("Length of array is zero in directive's controller.");
                return true;
            }

            return false;
        };

        fldc.arrayIsNotEmpty = function () {
            
            if ( (fldc.narrowObj.workingArray.length !== 0) 
                 && (fldc.narrowObj.workingArray[0] !== 'inital') ) {
                console.log("Length of array is not zero in directive's controller.");
                return true;
            }

            return false;
        };

    }   // End of FoundItemsDirectiveController


})();   // End of IIFE