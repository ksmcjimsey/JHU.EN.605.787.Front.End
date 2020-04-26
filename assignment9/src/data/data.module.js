(function () {
    'use strict';
    
    angular.module('Data', [])
    .config(function () {
        console.log("Data module config fired.");
      })
      
      .run(function () {
        console.log("Data module run fired.");
      });

    })();