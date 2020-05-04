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
  //
  // Get the list of categories and return the list of category objects
  // Used in routing where it will wait for the promise to be filled
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json')
    .then(function (response) {
        return response.data;
    });
  };


  // Get the list of items when passed the category short name
  // Used in routing where it will wait for the promise to be filled
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
  // This must return a promise instead of a value due to used in controller
  service.getShortNamePromise = function (shortName) {
      return $http.get(ApiPath + '/menu_items/' + shortName + ".json")
  }


  // Save the user data to the controller
  service.setUserPreferences = function(userPref) {
    if (userPref != null) {
      userData=userPref;
      console.log  ("User data saved: ", userData);
    }
  
  }

  // Retrieve a short name data from the server and return the data
  // Used in routing where it will wait for the promise to be filled

}



})();
