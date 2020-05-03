(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://mcjimsey-jhu-front-end.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
