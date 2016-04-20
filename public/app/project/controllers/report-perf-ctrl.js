define(['project/module'], function (module) {
	'use strict';

	module.registerController('ReportPerformanceCtrl',['$scope','$state', '$stateParams', 'ReportService',
   function ($scope, $state, $stateParams, ReportService) {

    $scope.projectId = $stateParams.id;
    $scope.jobId = $stateParams.jobId;
    
    ReportService.report($scope.projectId, $scope.jobId, function (data, status) {
      
      if (status === 200) {
        $scope.reports = data;
      } else { 
        $.smallBox({
          title: 'Notification',
          content: 'The job ' + $scope.jobId + " has no reports",
          color: '#296191',
          iconSmall: 'fa fa-check bounce animated',
          timeout: 3000
        });
      }
    });
	}]);
});