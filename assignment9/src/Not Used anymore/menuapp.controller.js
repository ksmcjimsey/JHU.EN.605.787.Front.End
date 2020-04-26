// menuapp controller
(function () {
    'use strict;'

    angular.module('MenuApp')
    .controller('MenuAppController', MenuAppController);

    MenuAppController.$inject = ['MenuDataService'];
    function MenuAppController(MenuDataService) {
    // MenuAppController.$inject = ['$http', 'MenuCategoriesService', 'myData'];
    // function MenuAppController($http, MenuCategoriesService, myData) {
        
        console.log(">> In MenuAppController");
        
        var $ctrl = this;

        // $ctrl.testVar = "Is this working from MenuApp";
        // $ctrl.categoriesArray = [];     // Holds the returned array
        // $ctrl.itemsArray = [];      // List of items based on short name

        // // Get the categories from http call
        // // Should this be a function call?
        // //$ctrl.getCategories = function () {

        //     var catagoryPromise = MenuDataService.getAllCategories();

        //     catagoryPromise.then(function (response) {
        //         $ctrl.categoriesArray=response.data;
        //         console.log("categoriesArray value in menu app controller", $ctrl.categoriesArray);
        //     })
        //         .catch(function (error) {
        //         console.log(error);
        //     })

        // //}


        // $ctrl.getItems = function (shortName) {
    
        //     if (!shortName.trim()) {
        //         return
        //     }

        //     var itemsPromise = MenuDataService.getItems(shortName);
        //     itemsPromise.then(function (response) {
        //         $ctrl.itemsArray=response.data;
        //         console.log("itemsArray value in menu app controller", $ctrl.categoriesArray);
        //     })
        //         .catch(function (error) {
        //         console.log(error);
        //     })

        // }        

    }

})();