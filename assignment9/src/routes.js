// IIFE to isolate variables in JS
(function () {
    'uses strict';

    angular.module('MenuApp')
    .config(RoutesConfig);  // configures the routes

    // Configuration for the routes
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to tab 1 if no other URL matches
        $urlRouterProvider.otherwise('/index.html');

        



    }   // End of function RoutesConfig

})();