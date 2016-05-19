define(['layout/module'], function(module) {

  'use strict';

  module.registerDirective('standaloneContext', 
    ['$rootScope', '$state', '$cookies', '$window', 'AuthenticationService', 'UserService', 
    function($rootScope, $state, $cookies, $window, AuthenticationService, UserService) {
      return {
        restrict: 'A',
        compile: function (element, attributes) {
          var expires = new Date();
          expires.setDate(expires.getDate() + 365);
          
          AuthenticationService.login("root@cloudats.net", "QWerty", function(data) {
            $cookies.put('authToken', data.authToken, {
              expires: expires
            });
          });
        }
      }
    }]
  );

});