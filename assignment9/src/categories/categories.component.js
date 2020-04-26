// Catagoires component and component controller
(function () {
    'use strict;'

    // Attach this controller to MenuApp module
    // The .controller added to the module was not shown before but this is
    // needed or the when we try to use the new controller we get a crappy
    // error.
    angular.module('MenuApp')
    .component('categoriesComponent', {
        templateUrl: 'src/categories/categories.template.html',
        //controller: CategoriesController
    })
    .controller('CategoriesController', CategoriesController);


    // Controller used for the categories partial page / view
    CategoriesController.$inject = ['catData'];
    function CategoriesController(catData) {
        
        console.log(">> In CategoriesController");

        var $ctrl = this;
        
        // Test access to this controller from inside the html
        // $ctrl.testVar = "Is this working?"

        // Called the service from the router so I don't need to call it
        // from this controller
        console.log("catData.data: ", catData.data);
        $ctrl.categoriesArray = catData.data;


    //     // Calling the data service here unless I figure out a way to
    //     // pass values from one controller to another.  The examples use 
    //     // a third view and pass the value into the view but that seems like
    //     // a waste of complication with no real benefit unless the view was
    //     // going to be used somewhere else.
    //     var catagoryPromise = MenuDataService.getAllCategories();

    //     catagoryPromise.then(function (response) {
    //         $ctrl.categoriesArray=response.data;
    //         console.log("Array value in CategoriesController controller", $ctrl.categoriesArray);
    //     })
    //         .catch(function (error) {
    //         console.log(error);
    //     })

    }

})();