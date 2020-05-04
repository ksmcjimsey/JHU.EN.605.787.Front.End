(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    // Need to inject the services
    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {

        var $ctrl = this;
        console.log("Made it to MenuController");

        // Error message control
        $ctrl.isSNValid = true;
        //console.log("Is short name valid?", $ctrl.isSNValid)

        // Success message control
        $ctrl.successfulSubmit = false;
      

        // Submit method
        $ctrl.submit = function () {

        // Check values from the form
        console.log("Name", $ctrl.user.firstname + " " + $ctrl.user.lastname);
        console.log("Email", $ctrl.user.email);
        console.log("Phone Number", $ctrl.user.phone);
        console.log("Short Name", $ctrl.user.email);

        // Call service to see if the short name is valid
        // Can check error code or maybe other fields if I can't figure
        // out error code.
        
        /*** need the promise returned here and then check if it is true or not
             in the then and catch.  Set values inside the then and catch    */
        $ctrl.shortNamePromise = MenuService.getShortNamePromise($ctrl.user.shortName);

        $ctrl.shortNamePromise.then(function (respone) {
            //console.log("Got items in isShortNameValid");

            // Call service to save the data

            // If valid, set completed message to true
            $ctrl.successfulSubmit = true;
          })
          .catch(function (error) {
            //console.log(error.data);
            // If not valid, set error message to true
            $ctrl.isSNValid = false;
        });
        
        // All needs to go into the promise that is returned.
        // If not valid, set error message to true

  }

    }
    
    
    })();