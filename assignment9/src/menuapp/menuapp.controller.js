// menuapp controller
(function () {
'use strict;'

angular.module('MenuApp')
.controller('MenuAppController', MenuAppController);

// Not sure why I can't use the service here because Data module is a depencency in MenuApp module??
// MenuAppController.$inject = ['$http', 'MenuCategoriesService', 'MenuDataService'];
// function MenuAppController($http, MenuCategoriesService, MenuDataService) {
// MenuAppController.$inject = ['$http', 'MenuCategoriesService'];
// function MenuAppController($http, MenuCategoriesService) {
MenuAppController.$inject = ['$http', 'MenuCategoriesService', 'myData'];
function MenuAppController($http, MenuCategoriesService, myData) {
    
    console.log(">> In MenuAppController");
    
    var mac = this;

    mac.categoriesArray = [];

    // Test function called by button
    mac.test = function () {
        console.log("In MenuAppController:test");

        var catagoryPromise = MenuCategoriesService.testFunction();
        catagoryPromise.then(function (response) {
            mac.categoriesArray=response.data;
            console.log("Array value in menu categories controller", mac.categoriesArray);
        })
        .catch(function (error) {
            console.log(error);
        })

        // var testHttp = $http({
        //     method: "GET",
        //     url: ("https://davids-restaurant.herokuapp.com/categories.json")

        // }).then (function success(response) {
        //     mac.categoriesArray=response.data;
        //     console.log("mac.categoriesArray", mac.categoriesArray);
        // })
        // .catch (function (error) {
        //     console.log(error);
        // });
    
        // return testHttp;

        // Get a promise back and then display it
        // This may all get moved to partial page html and directory
        //var testServiceCall = testService.testFunction();
    }

}

})();