define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('SpacesCtrl', ['$filter','$scope', '$mdDialog', 'SpaceService', '$mdToast',
		function ($filter, $scope, $mdDialog, SpaceService, $mdToast) {

		$scope.spaces = [];
		$scope.space = {};
		$scope.listUser = [];
		var firstSpace = null;
		$scope.currentSpace = null ;

		$scope.grants = [
			{
				user:"Trinhtv3",
				view:true,
				manage_project:true,
				grant_permission:true
			},
			{
				user:"tudh2",
				view:true,
				manage_project:true,
				grant_permission:false
			},
			{
				user:"haint21",
				view:true,
				manage_project:false,
				grant_permission:false
			}
		];
		$scope.originGrants = angular.copy($scope.grants);

		SpaceService.list(function(data){
			$scope.spaces = data ;
			SpaceService.get(data[0]._id, function(data, status){
			$scope.space = data[0];
			$scope.currentSpace = data[0].name ;
			});
		});
		$scope.edit = false;

		$scope.toggle = function (){
			$scope.edit = !$scope.edit;
			SpaceService.listUser(function(data, status){
				$scope.listUser = data ;
				$scope.originList = angular.copy($scope.listUser);
			});
			$scope.$watch('searchText', function(newText, oldText) {
	            if (newText !== oldText) {
	              if (newText) {
	                var results = $filter('filter')($scope.originList, {email: $scope.searchText});
	                $scope.listUser = results;
	              } else {
	                $scope.listUser = angular.copy($scope.originList);
	              }
	            }
	        });
		};


		$scope.parse = function (timestamp) {

	      var date = new Date(timestamp);
	      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

	      return result;
	    };

		$scope.getSpaceDetail = function(ev, spaceId){
			SpaceService.get(spaceId, function(data, status){
			$scope.space = data[0] ;
			$scope.currentSpace = data[0].name;
			});
		};

		$scope.clickNewSpace = function(ev){
			$mdDialog.show({
		        templateUrl: 'app/acl/views/dialog-new-space.tpl.html',
		        parent: angular.element(document.body),
		        targetEvent: ev,
		        clickOutsideToClose:true,
		        scope: $scope,
		        preserveScope: true,
		        controller: function() {
		        	$scope.space = {};
		            $scope.hide = function() {
		              $mdDialog.hide();
		            };
		            $scope.cancel = function() {
		              $mdDialog.cancel();
		            };
		            $scope.create = function(space) {
		            	$scope.space.name = space.name;
		            	$scope.space.desc = space.desc;
		              	SpaceService.createSpace($scope.space, function(data, status){
		              		$mdDialog.hide();
		              		if(status == 201){
		              			$mdToast.show($mdToast.simple().position('top right').textContent('Create new Space Success!'));
		              		} else if(status == 404){
		              			$mdToast.show($mdToast.simple().position('top right').textContent('User do not have Permission!'));
		              		}
		              	});
		            };
		          }
		        }).then(function () {
		    });
		};
		$scope.clickEditSpace = function(ev, space){
			$mdDialog.show({
		        templateUrl: 'app/acl/views/dialog-edit-space.tpl.html',
		        parent: angular.element(document.body),
		        targetEvent: ev,
		        clickOutsideToClose:true,
		        scope: $scope,
		        preserveScope: true,
		        controller: function() {
		            $scope.hide = function() {
		              $mdDialog.hide();
		            };
		            $scope.cancel = function() {
		              $mdDialog.cancel();
		            };
		            $scope.save = function() {
		            	$mdDialog.hide();
		              	SpaceService.update($scope.space, function(data, status){
		              		if(status==200){
		              			$mdToast.show($mdToast.simple().position('top right').textContent('Update The Space Success!'));
		              		} else {
		              			$mdToast.show($mdToast.simple().position('top right').textContent('Update The Space Error!'));
		              		}
		              });
		            };
		          }
		        }).then(function () {
		    });
		};

		$scope.deleteSpace = function (ev, spaceId) {
			var confirm = $mdDialog.confirm()
        .title('Would you like to delete this Space?')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Delete')
        .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	    	SpaceService.delete(spaceId, function(data, status){
	            if (status === 200) {

    			_.remove($scope.spaces, function (space) {
    				return space._id === spaceId;
    			});
    			$mdToast.show($mdToast.simple().position('top right').textContent('Delete The Space Success!'));
	    		}  else {
	    		$mdToast.show($mdToast.simple().position('top right').textContent('Delete The Space Error!'));	
	    		}	
          	});
	    }, function() {
	    });
		}
		$scope.deleteUser = function(grant){
			$scope.grants.splice(grant, 1);
		};
		$scope.cancelGrant = function(){
			$scope.edit = !$scope.edit;
			$scope.grants = $scope.originGrants ;
		};
		$scope.addUser = function(name){
			var grant = {
				user:name,
				view:false,
				manage_project:false,
				grant_permission:false
			};
			$scope.grants.push(grant);
			$scope.searchText = "";
		};

		$scope.clickSave = function(grants){
			console.log(grants);
			$scope.edit = !$scope.edit;
			$scope.grants = grants ;
		}

	}]);
});