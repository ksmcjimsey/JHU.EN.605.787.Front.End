// menuapp controller
(function () {
'use strict;'

angular.module('MenuApp')
.controller('MenuAppController', MenuAppController);

MenuAppController.$inject = ['$http', 'MenuCategoriesService'];
function MenuAppController($http, MenuCategoriesService) {
    var mac = this;

    mac.categoriesArray = [];

    // Test function called by button
    mac.test = function () {
        console.log(">> In MenuAppController:test");

        var catagoryPromise = MenuCategoriesService.testFunction();
        catagoryPromise.then(function (response) {
            mac.categoriesArray=response.data;
            console.log(">> At controller", mac.categoriesArray);
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