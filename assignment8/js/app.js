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
    .constant('ApiForMenu', "https://davids-restaurant.herokuapp.com/menu_items.json");


    // *** CONTROLLERS *** //

    // NarrowItDownController
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        // Get 'this' value for the controller
        var narrow = this;

        // Value in the search box
        narrow.searchWord = "";

        //var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        narrow.returnList = function() {
            console.log("Inside returnList with searchTerm equal to: ", narrow.searchWord);

            var promise = MenuSearchService.getMatchedMenuItems(narrow.searchWord);
            console.log("promise equals: ", promise)

        }


        

    }   // End of NarrowItDownController


    // *** SERVICES *** //

    // Menu search service
    MenuSearchService.$inject = ['$http', "ApiForMenu"];
    function MenuSearchService($http, ApiForMenu) {


        // Rename this
        var muService = this;

        // Data / variables


        //S Methods
        muService.getMatchedMenuItems = function (searchTerm) {
            //console.log("In muService.getMatchedMenuItems");

            // Use seperate variable instead of return so I can troubleshoot
            // Make the http call and get a promise back
            var finalResult = $http({
                method: "GET",
                url: (ApiForMenu)

            }).then(function success(response) {
                //console.log("Then response is : ", response);
                //console.log("Then response data: ", response.data);

                // Pass in the promise so I can return a promise
                //var subArray = calcSubArray(response.data.menu_items);
                var subPromise = calcSubArray(response, searchTerm);
                console.log("Then subPromise value: ", subPromise);

                return subPromise;

            }, function error (response) {
                console.log("Error response: ", response);
                return response;
            });

            console.log("finalResult Result: ", finalResult);
            //return finalResult
        }

        function calcSubArray (inputPromise, searchTerm) {

            // Short cut to promise menu array.
            var sc = inputPromise.data.menu_items;
            // sc[0].name="Kevin is awesome";
            // console.log("Initial array: ", inputPromise.data.menu_items);
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
                console.log("For " + i + " the description is: " + sc[i].description);

                // If substring is not in description of object then remove
                if (!sc[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    console.log(searchTerm + " not found");
                    sc.splice(i, 1);     // Removes the current element
                }

            }

            console.log("Returned inputPromise", inputPromise);
            return inputPromise;

        }

    }   // End of MenuSearchService


})();   // End of IIFE