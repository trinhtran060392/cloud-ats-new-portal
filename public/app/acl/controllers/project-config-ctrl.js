define(['acl/module'], function (module) {
	'use strict';
	module.registerController('ProjectConfCtrl', ['$scope', function ($scope) {
		
		$scope.edit = false;

		$scope.toggle = function (){
			$scope.edit = !$scope.edit;
		}

	}]);
})