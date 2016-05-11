define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('TenantConfCtrl', ['$scope', 'SpaceService', function ($scope, SpaceService) {

		SpaceService.list(function (data, status) {
			$scope.spaces = data;
		});
		
	}]);
});