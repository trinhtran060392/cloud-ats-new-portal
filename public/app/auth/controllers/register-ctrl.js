define(['auth/module'], function(module) {
  'use strict';

  return module.registerController('RegisterCtrl', ['$scope', '$cookies', '$state', '$window', '$rootScope' , 'AuthenticationService', RegisterCtrl]);

  function RegisterCtrl($scope, $cookies, $state, $window, $rootScope, AuthenticationService) {
    $scope.email = '';
		$scope.password = '';
		$scope.firstname = '';
		$scope.lastname = '';
    $scope.space = '';

		AuthenticationService.getTenants(function(data){
			$scope.tenants = data;

      if (data.length > 0) {
        $scope.checkTenant = true;
      } else {
        $scope.checkTenant = false;
      }
		});
    
    $scope.submit = function() {
      var expires = new Date();
      expires.setDate(expires.getDate() + 365);
      if ($scope.checkEmailPattern == false && $scope.checkEmail == false && $scope.selectedTenant != null && $scope.firstname != "" && $scope.lastname != "" && ($scope.password == $scope.repass) && $scope.checkPass == false) {
        AuthenticationService.register($scope.email, $scope.password, $scope.firstname, $scope.lastname, $scope.selectedTenant, $scope.space, function(data) {
        	
          if (data.error) {
            $scope.message = data.message;     
            $scope.checkEmail = true;
            $scope.message = 'The email exists, you can use another email';
            $('form').find('fieldset section').first().find('.input').addClass("state-error");
            $('form').find('fieldset section').first().find('.input').removeClass("state-success");
          } else {
              $window.sessionStorage.removeItem('context');

              $cookies.put('authToken', data.authToken, {
                expires: expires
              });
            	AuthenticationService.context().then(function(context) {
                //var tenant = context.tenant._id.toLowerCase();
                $window.sessionStorage.setItem('context', JSON.stringify(context));
                $rootScope.context = context;
                $state.go('app.dashboard');
              });
            }
          
        	
        });
      }
    }
  }
});