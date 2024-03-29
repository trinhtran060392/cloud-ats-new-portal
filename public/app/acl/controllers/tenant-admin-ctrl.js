define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('TenantAdminCtrl', ['$mdDialog', '$mdToast', '$scope', 'TenantAdminService', 
		function ($mdDialog, $mdToast, $scope, TenantAdminService) {

		$scope.edit = false;
		$scope.hasChanged = false;
		$scope.toggle = function (){
			$scope.edit = !$scope.edit;
		}
		var originUsers = undefined;
		TenantAdminService.list(function (data, status) {
			$scope.spaces = data.spaces;
			$scope.originSpaces = angular.copy($scope.spaces);
			_.forEach(data.users, function (user) {
				if (user.permission.indexOf('viewSpaces') != -1) {
					user.viewSpaces = true;
				} else user.viewSpaces = false;
				if (user.permission.indexOf('manageSpaces') != -1) {
					user.manageSpaces = true;
				} else user.manageSpaces = false;
				if (user.permission.indexOf('grantPermission') != -1) {
					user.grantPermission = true;
				} else user.grantPermission = false;
			});
			$scope.users = data.users;
			originUsers = angular.copy(data.users);
		});

		$scope.deleteSpace = function (ev, id) {

			var confirm = $mdDialog.confirm()
        .title('Would you like to delete this space ?')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Delete')
        .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	    	TenantAdminService.delete(id, function (data, status) {
					if (status === 200) {
						_.remove($scope.spaces, function (space) {
							return space._id === id;
						});
						$scope.originSpaces = angular.copy($scope.spaces);
						$mdToast.show($mdToast.simple().position('top right').textContent('Delete The Space Success!'));
					}
				});
	    }, function() {
	    });
		}
		
		$scope.createSpace = function (ev) {
			$mdDialog.show({
          
        templateUrl: 'app/acl/views/create-space-dialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function() {

          $scope.data_name = undefined;

          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            TenantAdminService.create($scope.data_name, function (data, status){
              if (status === 200) {
               	$scope.spaces.push(data);
                $mdDialog.hide();
                $mdToast.show($mdToast.simple().position('top right').textContent('The Space has been created!'));
              }
            });
          };
        }
      })
		}

		$scope.$watch('searchText', function (text) {
			$scope.hintedUsers = [];
			if (text) {
				TenantAdminService.search(text, function (data, status) {
					_.forEach(data, function (user) {
						$scope.hintedUsers.push(user);
					});
				});
			} 
		});

		$scope.$watch('users', function (newUsers) {
			if (originUsers && (angular.toJson(newUsers) != angular.toJson(originUsers))) {
				$scope.hasChanged = true;
			} else {
				$scope.hasChanged = false;
			}
		}, true);

		$scope.cancel = function () {
			$scope.users = angular.copy(originUsers);
		}

		$scope.addUser = function (userSelected) {

			if (_.some($scope.users, function (user) {
				return user._id === userSelected._id;
			})) {
				$mdToast.show($mdToast.simple().position('top right').textContent('The user was an admin!'));
			} else {
				TenantAdminService.addAdmin(userSelected, function (data, status) {
					if (status === 200) {
						$scope.users.push(data);
						$scope.hintedUsers = [];
						$scope.userSelected = undefined;
						$scope.searchText = undefined;
						$mdToast.show($mdToast.simple().position('top right').textContent('The user has added!'));
					}
				});
			}
		}

		$scope.removeUser = function (ev, id, index) {
			var confirm = $mdDialog.confirm()
        .title('Would you like to delete role of this user?')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Delete')
        .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	    	TenantAdminService.removeRole(id, function (data, status) {
					if (status === 200) {
						_.remove($scope.users, function (user) {
							return user._id === id;
						});
						_.remove($scope.originUsers, function (user) {
							return user._id === id;
						});
						$mdToast.show($mdToast.simple().position('top right').textContent('Delete The Role Success!'));
					}
				});
	    }, function() {
	    });
		}

	}]);
});