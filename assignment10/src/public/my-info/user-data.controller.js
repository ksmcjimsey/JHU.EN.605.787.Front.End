(function () {
"use strict";

angular.module('public')
.controller('UserDataController', UserDataController);

UserDataController.$inject = ['userPref', 'ApiPath'];
function UserDataController(userPref, ApiPath) {

  var $ctrl = this;
  $ctrl.hasValue =  false;
  $ctrl.phoneHasValue = false;
  $ctrl.basePath = ApiPath;
  
  // Did the user set the user values yet?
  if (Object.keys(userPref).length==0) {
    console.log ("Object is empty");
    $ctrl.hasValue =  false;
    $ctrl.phoneHasValue = false;
  }

  // User has set up preferences so check if phone number is set.
  else {
    console.log ("Object has keys and thus values");
    $ctrl.hasValue =  true;

    if (userPref.userData.phone) {
      $ctrl.phoneHasValue = true;
    } else {
      $ctrl.phoneHasValue = false;
    }
  }
  
  $ctrl.userPref = userPref;
  console.log("Assign $ctrl.userPref: ", $ctrl.userPref);

}


})();
