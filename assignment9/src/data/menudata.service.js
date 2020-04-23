(function () {
    'use strict';

    // Declare the service
    angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiForCategories', 'https://davids-restaurant.herokuapp.com/categories.json')
    .constant('ApiForItems', 'https://davids-restaurant.herokuapp.com/menu_items.json');


    // Define the service
    MenuDataService.$inject = ['$http', 'ApiForCategories', 'ApiForItems'];
    function MenuDataService($http, ApiForCategories, ApiForItems) {

        console.log(">> In the MenuDataService service!");

        // Assign the 'this' value to variable service
        var service = this;

        service.getAllCategories = function() {

            console.log("In service.getAllCategories");

            var response = $http({
                method: "GET",
                url: (ApiForCategories)
            });

            console.log ("response valeu in service.getAllCategories", response);
            return response;

        };


    }

})();