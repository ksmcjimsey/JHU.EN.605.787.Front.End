// menuapp controller
(function () {
'use strict;'

angular.module('MenuApp')
.controller('MenuAppController', MenuAppController);

MenuAppController.$inject = ['$http', 'MenuAppFactory'];
function MenuAppController($http, MenuAppFactory) {
    var mac = this;

    // Test factory/service
    var testService = MenuAppFactory();

    mac.categoriesArray = [];

    // var promise = testService.getMenuCategories();
    // promise.then (function (response) {
    //     console.log(promise);
    // })
    // .catch (function (error) {
    //     console.log(error);
    // })


    // Test function called by button
    mac.test = function () {
        console.log(">> In MenuAppController:test");

        var bsAngular = testService.getMenuCategories();
        bsAngular.then(function (response) {
            console.log(">> At controller", response.data);
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
    
        return testHttp;

        // Get a promise back and then display it
        // This may all get moved to partial page html and directory
        //var testServiceCall = testService.testFunction();
    }

}

})();