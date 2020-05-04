(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);



MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  // SERVICE DATA
  var userData = {};


  // SERVICE METHODS
  // Get the list of categories and return the list of category objects
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json')
    .then(function (response) {
        return response.data;
    });
  };


  // Get the list of items when passed the category short name
  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config)
    .then(function (response) {
      return response.data;
    });
  };


  // Check if the short name is valid
  // This must return a promise instead of a value due to the 
  service.getShortNamePromise = function (shortName) {
      return $http.get(ApiPath + '/menu_items/' + shortName + ".json")
      
  }


  // Save the user data to the controller
  service.setUserPreferences = function(userPref) {
    
  }

  // Retrieve a short name data from the server and return the data


}



})();
