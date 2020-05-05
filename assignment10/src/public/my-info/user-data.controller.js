(function () {
"use strict";

angular.module('public')
.controller('UserDataController', UserDataController);

UserDataController.$inject = ['userPref'];
function UserDataController(userPref) {

  var $ctrl = this;

  $ctrl.hasValue =  false;
  $ctrl.phoneHasValue = true;


  console.log("in UserDataController looking at userPref service return",
  userPref);

  if (Object.keys(userPref).length==0) {
    console.log ("Object is empty");
  }



  
  $ctrl.userPref = userPref;
  console.log("Assign $ctrl.userPref: ", $ctrl.userPref);

}


})();
