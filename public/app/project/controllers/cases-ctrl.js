define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('CasesCtrl', [
    'SharedDataService', '$mdMedia', '$mdSidenav', '$scope', 'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', 
    function (SharedDataService, $mdMedia, $mdSidenav, $scope, CaseService, $state, $stateParams, $mdDialog, $mdToast) {

		$scope.$parent.isSidenavOpen = true;
    $scope.$parent.isSidenavLockedOpen = $mdMedia('gt-md');

    $scope.$watch(function() { return $mdMedia('gt-md'); }, function(big) {
      $scope.$parent.isSidenavLockedOpen = big;
      $scope.$parent.isSidenavOpen = big;
    });

    $scope.toggleProjectNavLeft = function() {
      $scope.$parent.isSidenavLockedOpen = false;
      $mdSidenav('project-nav-left').toggle();
    };

    $scope.projectId = $stateParams.id;
    $scope.sharedData = SharedDataService;
    
    $scope.parse = function (timestamp) {

      var date = new Date(timestamp);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

      return result;
    }

		CaseService.list($scope.projectId, function (data, status) {
      $scope.sharedData.project = data;
		});

    $scope.clickCase = function (ev, id) {
      $state.go('app.project.keyword-cases.case', {id : $scope.projectId,caseId : id});
    }
    
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

	    			_.remove($scope.sharedData.project.cases, function (caze) {
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
        controller: function() {

        	$scope.oldData = name;
          $scope.data_name = undefined;
          $scope.title = "Case";
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            CaseService.clone($scope.projectId, id, $scope.data_name, function (data, status){
              if (status === 200) {
               
                $scope.sharedData.project.cases.push(data);
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