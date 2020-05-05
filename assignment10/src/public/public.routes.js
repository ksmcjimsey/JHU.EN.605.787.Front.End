(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  // Parent abstract route
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })

    // Main home route
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })

    // Menu categories list
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })

    // Specific menu list
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    
    .state('public.sign-up', {
      url: '/signup',
      templateUrl: 'src/public/sign-up/sign-up-newsletter.html',
      controller: "SignUpController",
      controllerAs: 'signUpCtrl'
    })
    
    .state('public.my-info', {
      url: '/info',
      templateUrl: 'src/public/my-info/user-data.html',
      controller: 'UserDataController',
      controllerAs: 'userDataCtrl',
      resolve: {
        userPref: ['MenuService', function (MenuService) {
          return MenuService.getUserPreferences();
        }]
      }
    });
}
})();
