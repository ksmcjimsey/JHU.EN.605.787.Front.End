(function () {
    'use strict';
    
    // https://www.tutorialspoint.com/angularjs/angularjs_modules.htm
    // https://stackoverflow.com/questions/22966858/angularjs-access-service-from-different-module
    angular.module('MenuApp', ['Data'])
    
    .config(function () {
      console.log("MenuApp config fired.");
    })
    
    .run(function () {
      console.log("MenuApp run fired.");
    });
    
    })();