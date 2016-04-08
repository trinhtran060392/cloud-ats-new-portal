define(['auth/module'], function(module) {

	'use strict';

	module.registerDirective('emailValidate', ['AuthenticationService',function(AuthenticationService) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				
				scope.checkEmail = false;
				element.on('blur', function() {
					
					var email = element.val();

					if (email.length > 0) {

						AuthenticationService.checkAccount(email, function(data){
							if (data === 'false') {
		            scope.checkEmail = true;
		          } else {
		          	scope.checkEmail = false;
		          }
						});
					}
					else {
						scope.checkEmail = false;
					}
				});
			}	
		}

	}]);

});