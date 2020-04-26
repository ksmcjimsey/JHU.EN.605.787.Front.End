// Catagoires component and component controller
(function () {
    'use strict;'

    // Attach this controller to MenuApp module
    // The .controller added to the module was not shown before but this is
    // needed or the when we try to use the new controller we get a crappy
    // error.
    angular.module('MenuApp')
    .component('itemsComponent', {
        templateUrl: 'src/items/items.template.html',
        //controller: ItemsController
        //controller: 'CategoriesController as $ctrl',

        // 
        resolve: {
            myData: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getItems("SP");
            }]
        }
    })

})();