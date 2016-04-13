define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('CaseCtrl', ['$scope', 'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', function ($scope, CaseService, $state, $stateParams, $mdDialog, $mdToast) {

		$scope.projectId = $stateParams.id;
		CaseService.list($scope.projectId, function (data, status) {
			$scope.cases = data;
		});

		$scope.delete = function (ev, id) {
			var confirm = $mdDialog.confirm()
        .title('Would you like to delete your case?')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Delete')
        .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	    	CaseService.delete($scope.projectId, id, function (data, status) {
	    		if (status === 200) {

	    			_.remove($scope.cases, function (caze) {
	    				return caze._id === id;
	    			});
	    			$mdToast.show($mdToast.simple().position('top right').textContent('Delete The Case Success!'));
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
          $scope.title = "Case";
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            CaseService.clone($scope.projectId, id, $scope.data_name, function (data, status){
              if (status === 200) {
               
                $scope.cases.push(data);
                $mdDialog.hide();
                $mdToast.show($mdToast.simple().position('top right').textContent('The Case has been cloned!'));
              }
            });
          };
        }
      })
		}
	}]);
})