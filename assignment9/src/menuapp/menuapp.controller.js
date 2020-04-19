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

    // var promise = testService.getMenuCategories();
    // promise.then (function (response) {
    //     console.log(promise);
    // })
    // .catch (function (error) {
    //     console.log(error);
    // })


    // Test function called by button
    mac.test = function () {
        console.log("I HATE Angular!!!");

        var bsAngular = testService.getMenuCategories();
        bsAngular.then(function (response) {
            console.log(">> At controller", response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        
        categoriesArray = [];

        var testThisBS = $http({
              method: "GET",
              url: ("https://davids-restaurant.herokuapp.com/categories.json")

            }).then (function success(response) {
                console.log(response.data);
            })
            .catch (function (error) {
                console.log(error);
            });
        
            return testThisBS;

        // Get a promise back and then display it
        // This may all get moved to partial page html and directory
        //var testServiceCall = testService.testFunction();
    }

}

})();