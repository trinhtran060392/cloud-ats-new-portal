define(['auth/module'], function (module) {
	'use strict';

	module.registerController('LoginCtrl', ['$cookies', '$scope', '$state', '$rootScope', '$window', 'AuthenticationService', function ($cookies, $scope, $state, $rootScope, $window, AuthenticationService) {
		$scope.login = function () {
			var expires = new Date();
      expires.setDate(expires.getDate() + 365);
      if ($scope.form.email.trim() != '' && $scope.form.password.trim() != '') {
      	console.log($scope.form);
        AuthenticationService.login($scope.form.email, $scope.form.password, function(data) {
          if (data.error) {
            $scope.message = data.message;          
          } else {
            $cookies.put('authToken', data.authToken, {
              expires: expires
            });

            AuthenticationService.context().then(function(context) {
              $window.sessionStorage.setItem('context', JSON.stringify(context));
              $rootScope.context = context;
              $state.go('app.dashboard');
            });
          }
        });
      }
		}
	}]);
})