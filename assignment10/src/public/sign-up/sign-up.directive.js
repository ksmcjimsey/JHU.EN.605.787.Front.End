(function (angular) {
    "use strict";

    
    // Add to the public module
    var app = angular.module('public');


    // Final working copy
    app.directive('favorite', ['$q', 'MenuService', 
        function($q, MenuService) {

        return {

          require: 'ngModel',

          link: function(scope, elm, attrs, ctrl) {
        
                ctrl.$asyncValidators.favorite = function(modelValue, viewValue) {
        
                    console.log("Made it to the favorite directive");
                    console.log("modelValue for favorite", modelValue);  // User input

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                    console.log("empty is valie");
                }
        
                // Try to run my own promise
                var smallName = modelValue.toUpperCase();
                var promise = MenuService.getShortNamePromise(smallName);
                console.log("My test promise", promise);

                return promise;

            };
          }
        };
      }]);
    
    
    
    // angular.module('public')
    // .directive('ShortNameCheck', ShortNameCheck);

    // ShortNameCheck.$inject = ['MenuService'];
    // function ShortNameCheck (MenuService) {
    // //     return {
    // //         required: 'ngModel',
    // //         link: function(scope, elm, attrs, ctrl) {
    // //             ctrl.$validators.shortName = function(modelValue, viewValue) {
    // //                 console.log(">> Made it to directive");
    // //                 console.log($modelValue);
    // //             }
    // //         }

    // //         //console.log (">>");



    // //     }

    // }


    // Adult comes from the word after ng-model
    // app.directive('adult', function () {
    //     return {
    //         require: 'ngModel',
    //         link: function (scope, element, attributes, control) {
               
    //             control.$validators.adult = function (modelValue, viewValue) {

    //                 console.log("Made it to the directive");
    //                 console.log("modelValue", modelValue);  // User input

    //                 if (control.$isEmpty(modelValue)) // if empty, correct value
    //                 {
    //                     return true;
    //                 }
                    
    //                 var age = Number(viewValue);
    //                 console.log("age: ", age);
                    
    //                 if (age >= 18 && age <= 100) // correct value
    //                 {
    //                     return true;
    //                 }
    //                 return false; // wrong value
    //             };
    //         }
    //     };
    // });



    // app.directive('favorite3', ['$q', 'MenuService', function($q, MenuService) {

    //     return {
    //         required: 'ngModel',

    //         link: function (scope, elm, attrs, ctrl) {

    //             ctrl.$asyncValidators.favorite3 = function(modelValue, viewValue) {

    //                 console.log("Made it to favorite3 directive");
    //                 console.log("modelValue favorite3", modelValue);  // User input

    //                 if (ctrl.$isEmpty(modelValue)) {
    //                     // consider empty model valid
    //                     return $q.resolve();
    //                     console.log("empty is valie");
    //                   }
              
    //                   var def = $q.defer();
              
    //                   $timeout(function() {
        
    //                     console.log("in simulated service call");
    //                     // Mock a delayed response
    //                     if (usernames.indexOf(modelValue) === -1) {
    //                       // The username is available
    //                       def.resolve();
    //                     } else {
    //                       def.reject();
    //                     }
              
    //                   }, 2000);
              
    //                   return def.promise;

    // //                 var promise = MenuService.getShortNamePromise("tt");
    // //                 return promise;

    //             };
            
    //         }
    //     }

    // }]);


    // app.directive('favorite3', ['$q', '$timeout', 'MenuService', 
    //     function($q, $timeout, MenuService) {

    //     return {

    //       require: 'ngModel',

    //       link: function(scope, elm, attrs, ctrl) {

    //             var usernames = ['Jim', 'John', 'Jill', 'Jackie'];
        
    //             ctrl.$asyncValidators.favorite3 = function(modelValue, viewValue) {
        
    //                 console.log("Made it to the favorite3 directive");
    //                 console.log("modelValue for favorite3", modelValue);  // User input

    //             if (ctrl.$isEmpty(modelValue)) {
    //                 // consider empty model valid
    //                 return $q.resolve();
    //                 console.log("empty is valie");
    //             }
        
    //             // Try to run my own promise
    //             var smallName = modelValue.toUpperCase();
    //             var promise = MenuService.getShortNamePromise(smallName);
    //             console.log("My test promise", promise);

    //             return promise;

    //             // Simulated http call
    //             // var def = $q.defer();
    
    //             // $timeout(function() {

    //             //     console.log("in simulated service call");
    //             //     // Mock a delayed response
    //             //     if (usernames.indexOf(modelValue) === -1) {
    //             //     // The username is available
    //             //     def.resolve();
    //             //     } else {
    //             //     def.reject();
    //             //     }
        
    //             // }, 2000);
        
    //             // return def.promise;

    //         };
    //       }
    //     };
    //   }]);




    // app.directive('favorite2', ['$q', '$timeout', function($q, $timeout) {
    //     return {

    //       require: 'ngModel',

    //       link: function(scope, elm, attrs, ctrl) {

    //         var usernames = ['Jim', 'John', 'Jill', 'Jackie'];
      
    //         ctrl.$asyncValidators.favorite2 = function(modelValue, viewValue) {
      
    //             console.log("Made it to the favorite2 directive");
    //             console.log("modelValue for favorite2", modelValue);  // User input

    //           if (ctrl.$isEmpty(modelValue)) {
    //             // consider empty model valid
    //             return $q.resolve();
    //             console.log("empty is valie");
    //           }
      
    //           var def = $q.defer();
      
    //           $timeout(function() {

    //             console.log("in simulated service call");
    //             // Mock a delayed response
    //             if (usernames.indexOf(modelValue) === -1) {
    //               // The username is available
    //               def.resolve();
    //             } else {
    //               def.reject();
    //             }
      
    //           }, 2000);
      
    //           return def.promise;
    //         };
    //       }
    //     };
    //   }]);


})(window.angular);