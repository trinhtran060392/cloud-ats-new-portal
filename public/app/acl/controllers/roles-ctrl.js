define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('RolesCtrl', ['SpaceService', 'RoleService', '$filter','$scope', '$mdDialog', '$mdToast',
		function (SpaceService, RoleService, $filter, $scope, $mdDialog, $mdToast) {

			$scope.role = {};
			$scope.roles = [];
			$scope.currentRole = null ;
			$scope.edit = false;

			SpaceService.list(function(data){
				$scope.listSpaces = data ;
			});

			RoleService.list(function(data, status){
				$scope.roles = data ;
				RoleService.get(data[0]._id, function(result, status){
					$scope.role = result[0];
					$scope.role.permissions = result[0].permissions[0];
					SpaceService.get($scope.role.space._id,function(data, status){
						$scope.role.spaceName = data[0].name ;
					});
					$scope.currentRole = result[0].name ;
					$scope.originRole = angular.copy($scope.role);
				});
			});

			$scope.getRoleDetail = function(ev, roleId){
				RoleService.get(roleId, function(data, status){
					$scope.role = data[0] ;
					$scope.role.permissions = data[0].permissions[0];
					SpaceService.get($scope.role.space._id,function(data, status){
						$scope.role.spaceName = data[0].name ;
					});
					$scope.currentRole = data[0].name;
					$scope.originRole = angular.copy($scope.role);
				});
			};

			// $scope.$watch('role', function(newRole, originRole) {
			// 	console.log("111111111111");
	  //           if (newRole !== originRole) {
	  //           	console.log("2222222222222");
	  //           }
	  //       });

			$scope.clickNew= function(){
				$scope.edit = true;
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
				// SpaceService.list(function(data){
				// 	$scope.role.listSpaces = data ;
				// });
			}
			$scope.clickSave = function(){
				$scope.edit = false;
				console.log($scope.role);
				$scope.roles.push($scope.role);
				/*RoleService.create($scope.role, function (data, status) {
					console.log(data);
				});*/
			}

	}]);
});