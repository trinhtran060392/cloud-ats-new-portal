define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('RolesCtrl', ['TenantAdminService', 'SpaceService', 'RoleService', '$filter','$scope', '$mdDialog', '$mdToast',
		function (TenantAdminService, SpaceService, RoleService, $filter, $scope, $mdDialog, $mdToast) {

			$scope.role = {};
			$scope.roles = [];
			$scope.role.listUser = [];
			$scope.currentRole = null ;
			$scope.edit = false;
			$scope.root = "root";

			SpaceService.list(function(data){
				$scope.listSpaces = data ;
			});

			RoleService.list(function(data, status){
				$scope.roles = data ;
				$scope.role = data[0];
				$scope.currentRole = data[0].name ;
				$scope.role.permissions = buildPermission(data[0].permissions);
				_.forEach($scope.listSpaces, function(value, key){
					if($scope.role.space._id == value._id){
						$scope.role.spaceName = value.name ;
					}
				});

				RoleService.listUser($scope.role._id, function(data, status){
					$scope.role.listUser = data ;
				});

			});

			$scope.getRoleDetail = function(ev, roleId){
				RoleService.get(roleId, function(data, status){
					$scope.role = data;
					$scope.currentRole = data.name;
					$scope.role.permissions = buildPermission(data.permissions);
					RoleService.listUser($scope.role._id, function(data, status){
						$scope.role.listUser = data ;
					});
					_.forEach($scope.listSpaces, function(value, key){
						if($scope.role.space._id == value._id){
							$scope.role.spaceName = value.name ;
						}
					});
				});
			};
			$scope.$watch('searchText', function(newText, oldText) {
        if (newText !== oldText) {
        	if(newText){
        		$scope.listUserSearch = [];
        		TenantAdminService.search(newText, function (data, status) {
        			angular.forEach(data, function(value, key) {
				  			$scope.listUserSearch.push(value);
							});
						});
        	}
        }
      });
      $scope.addUser = function(user){
      	$scope.role.listUser.push(user);
				$scope.searchText = "";
			};

			$scope.removeUser = function(user){
  			_.remove($scope.role.listUser, function (obj) {
  				return user._id === obj._id;
  			});
				$scope.searchText = "";
			};

			$scope.clickEditRole = function(role){
				$scope.edit = true;
				$scope.role = role ;
				$scope.originRole = angular.copy($scope.role);
				console.log($scope.originRole);
			}
			$scope.deleteRole = function(roleId){
				RoleService.delete(roleId, function(data, status){
					if(status==201){
						_.remove($scope.roles, function (obj) {
		  				return roleId === obj._id;
		  			});
						$mdToast.show($mdToast.simple().position('top right').textContent('Delete Role Success!'));
					} else {
						$mdToast.show($mdToast.simple().position('top right').textContent('Delete Role Error!'));
					}
				});

			}
			$scope.clickCancel = function(){
				$scope.edit = false;
				$scope.role = $scope.originRole;
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
					managePerformance:false,
					viewPerformance:false,
					grantPermisson:false
				};
				_.forEach(permissions, function (perm) {
					var foo = perm.rule.split('@')[0];
					var feature = foo.split(':')[0];
    			var action = foo.split(':')[1];
					switch(action){
    				case "*":
  					_.forIn(result, function(value, key){
  						result[key] = true;
  					});
  					break;
    			}

    			if(feature == "tenant") {
    				switch(action){
    				case "view_spaces":
    					result.viewSpaces = true;
    					break;
    				case "manage_spaces":
    					result.manageSpaces = true;
    					break;
    				case "grant_permission":
    					result.grantTenant = true;
    					break;
    				default: 
    					break;
    			}
    			} else if (feature == "space"){
    				switch(action){
    				case "update_space":
    					result.updateSpace = true;
    					break;
    				case "manage_projects":
    					result.manageProjects = true;
    					break;
    				case "grant_permission":
    					result.grantSpace = true;
    					break;
    				case "view_projects":
    					result.viewProjects = true;
    					break;
    				default: 
    					break;
    			}

    			} else if (feature == "project"){
    				switch(action){
    				case "view_functional":
    					result.viewFunction = true;
    					break;	
    				case "manage_functional":
    					result.manageFunction = true;
    					break;
    				case "upload_selenium":
    					result.uploadSelenium = true;
    					break;
    				case "view_performance":
    					result.viewPerformance = true;
    					break;
    				case "manage_performance":
    					result.managePerformance = true;
    					break;
    				case "grant_permission":
    					result.grantPermisson = true;
    					break;
    				default: 
    					break;
    			}
    				
    			}
				});
				return result;
			};

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
						managePerformance:false,
						viewPerformance:false,
						grantPermisson:false
					}
				}
				$scope.role.listUser = [];
			}
			$scope.clickSave = function(){
				$scope.edit = false;
				if($scope.role._id != null || $scope.role._id != undefined){
					RoleService.update($scope.role, function (data, status) {
					if(status==201){
						$mdToast.show($mdToast.simple().position('top right').textContent('Update Role Success!'));
					} else {
						$mdToast.show($mdToast.simple().position('top right').textContent('Update Role Error!'));
					}
				});
				} else {
					RoleService.update($scope.role, function (data, status) {
						if(status==201){
							$scope.roles.push($scope.role);
							$scope.currentRole= $scope.role.name ;
							$mdToast.show($mdToast.simple().position('top right').textContent('Create New Role Success!'));
						} else {
							$mdToast.show($mdToast.simple().position('top right').textContent('Create New Role Error!'));
						}
					});
				}
			}

	}]);
});