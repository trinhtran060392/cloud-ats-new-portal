define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('SuitesCtrl', [
    'SharedDataService', '$mdMedia', '$scope', 'SuiteService', '$state', '$stateParams', '$mdDialog', '$mdToast', 
    function (SharedDataService, $mdMedia, $scope, SuiteService, $state, $stateParams, $mdDialog, $mdToast) {

    $scope.$parent.isSidenavOpen = true;
    $scope.$parent.isSidenavLockedOpen = $mdMedia('gt-md');

    $scope.$watch(function() { return $mdMedia('gt-md'); }, function(big) {
      $scope.$parent.isSidenavLockedOpen = big;
      $scope.$parent.isSidenavOpen = big;
    });

		$scope.projectId = $stateParams.id;
    $scope.sharedData = SharedDataService;
    
    $scope.parse = function (timestamp) {

      var date = new Date(timestamp);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

      return result;
    }

		SuiteService.list($scope.projectId, function (data, status) {
			$scope.sharedData.project = data;
      console.log($scope.sharedData);
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

	    			_.remove($scope.sharedData.project.suites, function (suite) {
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
        controller: function() {

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

    $scope.clickSuite = function (ev, id) {
      $state.go('app.project.keyword-suites.suite', {id : $scope.projectId, suiteId : id});
    }

	}]);
})