// IIFE to isolate variables in JS
(function () {
    'uses strict';

    // Had to define MenuApp module here.  Could not 
    // use a seperate module to define it for some unknown 
    // reason.  Crapppy error message from Angular
    // Router Step 3: ui.router dependency
    angular.module('MenuApp', ['ui.router', 'Data'])
    .config(function () {
      console.log("MenuApp module config fired.");
    })
    
    .run(function () {
      console.log("MenuApp module run fired.");
    });


    // Attach Router to the MenuApp routing using the config processing step.
    angular.module('MenuApp')
    .config(RoutesConfig);  // configures the routes

    // Configuration for the routes
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
      
      // Redirect to tab 1 if no other URL matches
      $urlRouterProvider.otherwise('/home');

        // Set up UI states
      $stateProvider

      // /index.html - returns html, css, and js
      .state('home', {
        url: '/home',
        templateUrl: 'src/menuapp/templates/menuapp.template.html'
      })

      // First list of categories
      // /index.html#/categoreis - the # keeps the request from going to the server
      // The new template may still be requested through AJAX by the js code
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories/categories.template.html',

        // This controller, if used refers to its own controller
        controller: 'CategoriesController as $ctrl',
        resolve: {
          catData: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        //resolve: { myData: 'some data'}
        }
      })

      .state('items', {
        // Optional but normally used.  If not here then the URL does not 
        // exist but can still be referenced  ui-sref
        url: '/items/{shortName}',
        templateUrl: 'src/items/items.template.html',
        controller: 'ItemsController as $ctrl',

        // MenuDataService will be the string that are injected into the function
        // so the MenuDataService should inject into the function.
        // MenuDataService.getItemsForCategory returns a promise.
        // myData has a value injected into ItemsController with a key
        // of myData.  $stateParams allows us to grab the parameter from the 
        // url and use it in the service method call.
        resolve: {
          itemsData: ['$stateParams', 'MenuDataService', 
                      function ($stateParams, MenuDataService) {
            // return MenuDataService.getItemsForCategory('L');
            return MenuDataService.getItemsForCategory($stateParams.shortName);
          }]
        }
      });

    }   // End of function RoutesConfig

})();