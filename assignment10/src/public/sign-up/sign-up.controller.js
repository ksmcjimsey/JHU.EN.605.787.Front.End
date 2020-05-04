(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    // Need to inject the services
    SignUpController.$inject = [];
    function SignUpController() {

        var $ctrl = this;
        console.log("Made it to MenuController");

        // Error message control
        $ctrl.isValid = true;

        // Success message control
        $ctrl.successfulSubmit = false;
      
        // Submit function
        $ctrl.submit = function () {
        console.log("Name", $ctrl.user.firstname + " " + $ctrl.user.lastname);

        // Call service to see if the short name is valid
        // Can check error code or maybe other fields if I can't figure
        // out error code.

        // If not valid set error message to true

        // If valid set completed message to true

        // Call service to save the data
  }

    }
    
    
    })();