// Catagoires component and component controller
(function () {
    'use strict;'


    angular.module('MenuApp')
    .component('itemsComponent', {
        templateUrl: 'src/items/items.template.html',
    })
    .controller('ItemsController', ItemsController);


    // Controller used for the items partial page / view
    // myData is a service called in the routes.js items state
    ItemsController.$inject = ['itemsData'];
    function ItemsController(itemsData) {
        
        console.log(">> In ItemsController");
        var $ctrl = this;

        console.log("first: ", itemsData.data.category.name);
        console.log("second:", itemsData.data.menu_items);
        $ctrl.title = itemsData.data.category.name
        $ctrl.itemsArray = itemsData.data.menu_items;

    }


})();