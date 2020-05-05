(function () {
"use strict";

angular.module('public')
.controller('UserDataController', UserDataController);

UserDataController.$inject = ['userData'];
function UserDataController(userData) {

  var $ctrl = this;
  console.log("in UserDataController looking at userData service return",
    userData);

  if (Object.keys(userData).length==0) {
    console.log ("Object is empty");
  }



  
  $ctrl.userData = userData;

}


})();
