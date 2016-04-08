define(['auth/module'], function(module) {
  'use strict';

  return module.registerController('LogoutCtrl', 
  ['$scope', '$cookies', '$state', 'AuthenticationService',
  function LogoutCtrl($scope, $cookies, $state, AuthenticationService) {

  	$scope.logout = function () {
  		AuthenticationService.logout(function(data) {
        $state.go('login');
  		});
  	}
  }]);

});