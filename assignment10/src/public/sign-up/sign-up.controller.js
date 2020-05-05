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
        // console.log("Name", $ctrl.user.firstname + " " + $ctrl.user.lastname);
        // console.log("Email", $ctrl.user.email);
        // console.log("Phone Number", $ctrl.user.phone);
        // console.log("Short Name", $ctrl.user.shortName);

        // Call the service to get the shortname data in promise form
        // Check if valid or not
        $ctrl.shortNamePromise = 
            MenuService.getShortNamePromise($ctrl.user.shortName.toUpperCase());

        $ctrl.shortNamePromise.then(function (respone) {
            //console.log("Got items in isShortNameValid");

            // Call service to save the data
            $ctrl.user.shortName = $ctrl.user.shortName.toUpperCase();
            MenuService.setUserPreferences($ctrl.user);

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