define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('RolesCtrl', ['SpaceService', 'RoleService', '$filter','$scope', '$mdDialog', '$mdToast',
		function (SpaceService, RoleService, $filter, $scope, $mdDialog, $mdToast) {

			$scope.listSpace =[
				{
					name:"Fsu1.Bu11"
				},
				{
					name:"Fsu11.Bu1"
				},
			];
			SpaceService.list(function(data){
				$scope.role.spaceName = data ;
				console.log($scope.role.spaceName);
			});

			$scope.clickNew= function(){
				console.log("11111111");
				$scope.role = {
					tenant:{
						view:false,
						manage:false,
						grant:false
					},
					space:{
						view:false,
						manage:false,
						grant:false
					},
					project:{
						view: false,
						manageFunction:false,
						viewFunction:false,
						uploadSelenium:false,
						manageData:false,
						managePerformance:false,
						viewPerformance:false,
						grantPermisson:false
					}

				}
			}

			$scope.clickSave = function(){
				console.log($scope.role);
				/*RoleService.create($scope.role, function (data, status) {
					console.log(data);
				});*/
			}

	}]);
});