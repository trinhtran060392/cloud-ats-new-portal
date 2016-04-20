define(['project/module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ReportOverviewPerfCtrl', 
    ['$window', '$scope', '$rootScope', '$stateParams', '$state', 'PerformanceService',
    function($window,$scope, $rootScope, $stateParams, $state, PerformanceService) {

      $scope.projectId = $stateParams.id;
      $scope.title = 'Performance Report Overview'
      PerformanceService.get($scope.projectId, function(response) {
        $scope.project = response;
        if (response.totalJob > 0) {
          var jobs = JSON.parse(response.jobs);
          $scope.project.jobs = jobs;
        } else $scope.project.jobs = [];
      });

      $scope.openJobReport = function (jobId) {
        $state.go('app.project.performance-reports.job', {jobId : jobId});
      }

      $scope.downloadJTL = function(projectId,jobId) {
        PerformanceService.download(projectId, jobId ,function (data,status) {
          var file = new Blob([data], {type: 'application/x-zip'});
          var link=document.createElement('a');
          link.download="jtl-file.zip";
          var browser ="";
          var userAgent = $window.navigator.userAgent;
          var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
          for(var key in browsers) {
            if (browsers[key].test(userAgent)) {
                browser = key;
            }
          };
          if (browser === "safari" || browser === "firefox") {
            link.href= window.URL.createObjectURL(file) ;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            link.href = window.navigator.msSaveOrOpenBlob(file,"jtl-file.zip");
            link.click();
          }
        });
      }

    }]);
});


