(function () {
    'use strict';

    // Declare the factory
    angular.module('MenuApp')
    .factory('MenuAppFactory', MenuAppFactory)
    .service('MenuCategoriesService', MenuCategoriesService)
    .constant('ApiForCategories', 'https://davids-restaurant.herokuapp.com');

    // Define the factory
    MenuAppFactory.$inject = ['$http'];
    function MenuAppFactory() {
        var factory = function () {
            console.log("In the MenuApp factory!")
            return new MenuCategoriesService();
        };

        return factory;
    }


    // Define the service the factory creates
    MenuCategoriesService.$inject = ['$http', 'ApiForCategories'];
    function MenuCategoriesService ($http, ApiForCategories) {

        // Assign the 'this' value
        var mCSService = this;
        console.log("In the MenuApp Service!");
        
        // mCSService.testFunction = function () {
        //     console.log("In MenuCategoriesService.testFunction");

        //     var response = $http({
        //         method: "GET",
        //         url: (ApiForCategories + "/categories.json")
        //     });

        //     console.log("response", response);
        //     return response;
        // };

        // This is BS - stupid angular should have better error messaging!!
        mCSService.getMenuCategories = function () {
            console.log("In mCSService.getMenuCategories");
            var response = $http({
            //$http({
               method: "GET",
               url: (ApiForCategories + "/categories.json")
            }).then (function success(response) {
                console.log(response.data);
            })
            .catch (function (error) {
                console.log(error);
            });
        
            return response;
        };

    }


})();