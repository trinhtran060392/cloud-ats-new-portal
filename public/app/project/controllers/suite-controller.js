define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('SuiteCtrl', ['$scope', 'SuiteService', '$state', '$stateParams', '$mdDialog', '$mdToast', function ($scope, SuiteService, $state, $stateParams, $mdDialog, $mdToast) {

		$scope.projectId = $stateParams.id;
		SuiteService.list($scope.projectId, function (data, status) {
			$scope.suites = data;
		});

		$scope.delete = function (ev, id) {
			var confirm = $mdDialog.confirm()
        .title('Would you like to delete your suite?')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Delete')
        .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	    	SuiteService.delete($scope.projectId, id, function (data, status) {
	    		if (status === 200) {

	    			_.remove($scope.suites, function (suite) {
	    				return suite._id === id;
	    			});
	    			$mdToast.show($mdToast.simple().position('top right').textContent('Delete The Suite Success!'));
	    		}
	    	});
	    }, function() {
	    });
		}

		$scope.clone = function (ev, id, name) {
			$mdDialog.show({
          
        templateUrl: 'app/projects/views/clone-data-dialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function DialogController($scope, $mdDialog) {

        	$scope.oldData = name;
          $scope.data_name = undefined;
          $scope.title = "Suite";
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            SuiteService.clone($scope.projectId, id, $scope.data_name, function (data, status){
              if (status === 200) {
               
                $scope.suites.push(data);
                $mdDialog.hide();
                $mdToast.show($mdToast.simple().position('top right').textContent('The Suite has been cloned!'));
              }
            });
          };
        }
      })
		}
	}]);
})