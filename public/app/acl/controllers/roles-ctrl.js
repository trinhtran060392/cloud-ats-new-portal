define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('RolesCtrl', ['TenantAdminService', 'SpaceService', 'RoleService', '$filter','$scope', '$mdDialog', '$mdToast',
		function (TenantAdminService, SpaceService, RoleService, $filter, $scope, $mdDialog, $mdToast) {
      
      $scope.permTemplate = {
        tenant: {
          manage_spaces: false,
          view_spaces: false,
          grant_permission: false
        },
        space: {
          update_space: false,
          manage_projects: false,
          view_projects: false,
          grant_permission: false
        },
        project: {
          manage_functional: false,
          upload_selenium: false,
          manage_performance: false,
          grant_permission: false,
          view_functional: false,
          view_performance: false
        }
      }

      $scope.roles = [];
      $scope.listSpaces = [];

      $scope.clickSave = function(){
        var permTransf = [];
        _.forEach($scope.currentRole.permissions, function(perm, key) {
        	 _.forEach(perm, function(feature, obj) {
        		_.forEach(feature, function(value,action) {
        			var rule = {
        				rule:undefined
        			};
      				if(value == true && obj != "$$hashKey") {
      					rule.rule = obj+":"+action+"@";
      					permTransf.push(rule);
      				}
        		});
	        });
        });
        var role = angular.copy($scope.currentRole);
        role.permissions = permTransf ;
        RoleService.update(role, function(resp, status){
        	if (status == 201) {
        		$scope.currentRole._id = resp._id;
        		console.log(getSpace(resp.space._id));
        		$scope.currentRole.space = getSpace(resp.space._id);
        		$scope.edit = false;
        		$mdToast.show($mdToast.simple().position('top right').textContent('Submit Role Success!'));
        	} else {
        		$mdToast.show($mdToast.simple().position('top right').textContent('Submit Role Error!'));
        	}
        });
      }

      $scope.clickNew = function() {
        $scope.currentRole = undefined ;
        $scope.edit = true;
        var permTemplate = angular.copy($scope.permTemplate);
        var role = {
          name: undefined,
          space: {},
          permissions: [ permTemplate ],
          listUser: []
        };

        $scope.currentRole = role;
        $scope.roles.push(role);
      }

      $scope.normalize = function(str) {
        var terms = str.split('_');
        var normalizeStr = ''
        _.forEach(terms, function(term) {
          normalizeStr += term.charAt(0).toUpperCase() + term.slice(1);
          normalizeStr += ' ';
        });
        return normalizeStr;
      }

      var initData =  function() {
      	SpaceService.list(function(data){
          $scope.listSpaces = data ;
        });
        RoleService.list(function(resp, status) {
          _.forEach(resp, function(role) {
            role.permissions = buildPermission(role);
            RoleService.listUser(role._id, function(resp, status){
            	role.listUser = resp;
            });
            if(role.space && role.space._id){
            	role.space = getSpace(role.space._id);
            }
            $scope.roles.push(role);
          });
          if ($scope.roles.length > 0) {
            $scope.currentRole = $scope.roles[0];
          }
        })
      }

      var getSpace = function(spaceId){
      	var result = _.find($scope.listSpaces, function (obj) {
      		return obj._id === spaceId;
      	});
      	return result;
      }

      initData();

      var buildPermission = function(role){
      	var permissions = [];
      	var permTemplate = angular.copy($scope.permTemplate);
      	_.forEach(role.permissions, function(perm) {
          if (perm.rule === "*:*@fsoft:*") {
            _.forEach(permTemplate, function(feature) {
              _.forEach(feature, function(value, key) {
                feature[key] = true;
              });
            });
          } else {
          	var foo = perm.rule.split('@')[0];
						var feature = foo.split(':')[0];
    				var action = foo.split(':')[1];
    				permTemplate[feature][action] = true;
          }
        });
        permissions.push(permTemplate);
        return permissions ;
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
      	$scope.currentRole.listUser.push(user);
				$scope.searchText = "";
			};

			$scope.selectRole = function(role){
				$scope.currentRole = angular.copy(role);
			};
			$scope.deleteRole = function(roleId){
				RoleService.delete(roleId, function(data, status){
					if(status==201){
						_.remove($scope.roles, function (obj) {
		  				return roleId === obj._id;
		  			});
		  			$scope.currentRole = $scope.roles[0];
						$mdToast.show($mdToast.simple().position('top right').textContent('Delete Role Success!'));
					} else {
						$mdToast.show($mdToast.simple().position('top right').textContent('Delete Role Error!'));
					}
				});
			};
			$scope.editRole = function(role){
				$scope.edit = true;
				$scope.currentRole = role ;
				$scope.originRole = angular.copy($scope.currentRole);
			};
			$scope.clickCancel = function(){
				$scope.edit = false;
				$scope.currentRole = $scope.originRole;
			};
			// $scope.role = {};
			// $scope.roles = [];
			// $scope.role.listUser = [];
			// $scope.currentRole = null ;
			// $scope.edit = false;
			// $scope.root = "root";

			/*SpaceService.list(function(data){
				$scope.listSpaces = data ;
			});

			RoleService.list(function(data, status){
				$scope.roles = data ;
				$scope.role = data[0];
				$scope.currentRole = data[0].name ;
				$scope.originRole = angular.copy($scope.role);
        if (data[0].space) {
          $scope.role.spaceId = data[0].space._id;
        } else {
          $scope.role.spaceId = "*";
        }
				$scope.role.permissions = buildPermission(data[0].permissions);
				_.forEach($scope.listSpaces, function(value, key){
          if ($scope.role.space) {
            if($scope.role.space._id == value._id){
              $scope.role.spaceName = value.name ;
            }
          }
				});

				RoleService.listUser($scope.role._id, function(data, status){
					$scope.role.listUser = data ;
				});

			});

			$scope.getRoleDetail = function(ev, roleId){
				RoleService.get(roleId, function(data, status){
					$scope.role = data;

          if (data.space) {
            $scope.role.spaceId = data.space._id;
          } else {
            $scope.role.spaceId = "*";
          }

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
				$scope.role.permissions = buildPermission($scope.originRole.permissions);
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

        console.log($scope.role);

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
			}*/

	}]);
});