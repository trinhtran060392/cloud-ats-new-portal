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
				$scope.role = data[0];
				$scope.currentRole = data[0].name ;
				$scope.originRole = angular.copy($scope.role);
				$scope.role.spaceId = data[0].space._id;
				$scope.role.permissions = buildPermission(data[0].permissions);
				console.log(data[0].permissions);
			});

			$scope.getRoleDetail = function(ev, roleId){
				RoleService.get(roleId, function(data, status){
					$scope.role = data;
					$scope.role.spaceId = data.space._id;
					$scope.currentRole = data.name;
					$scope.originRole = angular.copy($scope.role);
					$scope.role.permissions = buildPermission(data.permissions);
				});
			};

			var buildPermission= function(permissions){
				var result = {
					viewSpaces:false,
					manageSpaces:false,
					grantTenant:false,
					updateSpace:false,
					manageProjects:false,
					grantSpace:false,
					viewProjects: false,
					manageFunction:false,
					viewFunction:false,
					uploadSelenium:false,
					manageData:false,
					managePerformance:false,
					viewPerformance:false,
					grantPermisson:false
				};
				_.forEach(permissions, function (perm) {
					var foo = perm.rule.split('@')[0];
          			var bar = foo.split(':')[1];
          			switch(bar){
          				case "*":
          					_.forIn(result, function(value, key){
          						console.log(key);
          						result[key] = true;
          					});
          					break;
          				case "view_spaces":
          					result.viewSpaces = true;
          					break;
          				case "manage_spaces":
          					result.manageSpaces = true;
          					break;
          				case "grant_tenant":
          					result.grantTenant = true;
          					break;
          				case "update_space":
          					result.updateSpace = true;
          					break;
          				case "manage_projects":
          					result.manageProjects = true;
          					break;
          				case "grant_space":
          					result.grantSpace = true;
          					break;
          				case "view_projects":
          					result.viewProjects = true;
          					break;
          				case "view_functional":
          					result.viewFunction = true;
          					break;	
          				case "manage_functional":
          					result.manageFunction = true;
          					break;
          				case "upload_selenium":
          					result.uploadSelenium = true;
          					break;
          				case "manage_data":
          					result.manageData = true;
          					break;
          				case "view_performance":
          					result.viewPerformance = true;
          					break;
          				case "manage_performance":
          					result.managePerformance = true;
          					break;
          				case "grant_permisson":
          					result.grantPermisson = true;
          					break;
          				default: 
          					break;
          			}
				});
				console.log(result);
				return result;
			};

			// $scope.$watch('role', function(newRole, originRole) {
			// 	console.log("111111111111");
	  //           if (newRole !== originRole) {
	  //           	console.log("2222222222222");
	  //           }
	  //       });

			$scope.clickNew= function(){
				$scope.currentRole= undefined ;
				$scope.edit = true;
				$scope.role = {
					permissions:{
						viewSpaces:false,
						manageSpaces:false,
						grantTenant:false,
						updateSpace:false,
						manageProjects:false,
						grantSpace:false,
						viewProjects: false,
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
				RoleService.create($scope.role, function (data, status) {
					if(status==201){
						console.log(data);
						$scope.roles.push($scope.role);
						$scope.currentRole= $scope.role.name ;
						$mdToast.show($mdToast.simple().position('top right').textContent('Create New Role Success!'));
					} else {
						$mdToast.show($mdToast.simple().position('top right').textContent('Create New Role Error!'));
					}
				});
			}

	}]);
});