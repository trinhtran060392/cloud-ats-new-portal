define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('TenantAdminCtrl', ['$mdDialog', '$mdToast', '$scope', 'TenantAdminService', 
		function ($mdDialog, $mdToast, $scope, TenantAdminService) {

		$scope.edit = false;

		$scope.toggle = function (){
			$scope.edit = !$scope.edit;
		}

		TenantAdminService.list(function (data, status) {
			$scope.spaces = data.spaces;

			_.forEach(data.users, function (user) {
				if (user.permission.indexOf('viewSpaces') != -1) {
					user.viewSpaces = true;
				}
				if (user.permission.indexOf('manageSpaces') != -1) {
					user.manageSpaces = true;
				}
				if (user.permission.indexOf('grantPermission') != -1) {
					user.grantPermission = true;
				}
			});
			$scope.users = data.users;
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
			if (text && text.trim()) {
				TenantAdminService.search(text, function (data, status) {
					$scope.hintedUsers = data;
					if (data.length) {
						$('.hinted-user').click();
					}
				});
			} else {
				$scope.userSelected = undefined;
				$scope.hintedUsers = [];
			}
		});

		$scope.addUser = function (userSelected) {

			var userSelected = JSON.parse(userSelected);
			if (_.some($scope.users, function (user) {
				return user._id === userSelected._id;
			})) {
				$mdToast.show($mdToast.simple().position('top right').textContent('The user was an admin!'));
			} else {
				TenantAdminService.addAdmin(userSelected, function (data, status) {
					if (status === 200) {
						$scope.users.push(data);
						$mdToast.show($mdToast.simple().position('top right').textContent('The user has added!'));
					}
				});
			}
		}
	}]);
});