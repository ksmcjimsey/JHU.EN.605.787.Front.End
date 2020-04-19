(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('menuAppComponent', {
        templateUrl: 'src/menuapp/menuapp.template.html',
        controller: MenuAppComponentController
    });

})();


MenuAppComponentController.$inject = ['$rootScope'];
function MenuAppComponentController($rootScope) {
    var $ctrl = this;

    console.log(">> Inside MenuAppComponentController");
}