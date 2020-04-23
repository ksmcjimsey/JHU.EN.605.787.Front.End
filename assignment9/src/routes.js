// IIFE to isolate variables in JS
(function () {
    'uses strict';

    angular.module('MenuApp',['ui.router']);

    angular.module('MenuApp')
    .config(RoutesConfig);  // configures the routes

    // Configuration for the routes
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to tab 1 if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Set up UI states
      $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/menuapp.template.html'
      })

      // First list of categories
      .state('categories', {
        url: '/categories',
        // template: '<div>This is TAB 1 content</div>
        templateUrl: 'src/categories/categories.template.html',
        controller: 'MenuAppController as menuCtrl',
        // resolve: {
        //   catData: ['MenuDataService', function(MenuDataService) {
        //     return MenuDataService.getAllCategories();
        //   }]
        resolve: { myData: 'some data'}
        // }
      })

      .state('items', {
        url: '/items',   // Optional but normally used.  If not here then the URL does not exist but can still be referenced  ui-sref
        templateUrl: 'src/items/items.template.html'
      });

    }   // End of function RoutesConfig

})();