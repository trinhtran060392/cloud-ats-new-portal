define(['acl/module', 'lodash'], function (module, _) {
	
	'use strict';
	module.registerController('SpacesCtrl', ['$scope', '$mdDialog', 
		function ($scope, $mdDialog) {


		$scope.clickNewSpace = function(ev){
			$mdDialog.show({
		        templateUrl: 'app/acl/views/dialog-new-space.tpl.html',
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
		            $scope.create = function() {
		              console.log("11111");
		            };
		          }
		        }).then(function () {
		    });
		};
		$scope.clickEditSpace = function(ev){
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
		              console.log("11111");
		            };
		          }
		        }).then(function () {
		    });
		}


	}]);
});