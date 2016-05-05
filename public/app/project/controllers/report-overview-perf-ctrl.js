define(['project/module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ReportOverviewPerfCtrl', 
    ['$mdToast', '$mdDialog', 'EventService', '$window', '$scope', '$rootScope', '$stateParams', '$state', 'PerformanceService',
    function($mdToast, $mdDialog, EventService, $window, $scope, $rootScope, $stateParams, $state, PerformanceService) {

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

      $scope.viewLog = function(ev) {
        PerformanceService.log($scope.project._id, function (data, status) {
          if (status == 200) {
            $scope.project.log = data;
            $mdDialog.show({
            templateUrl: 'app/project/views/keyword/dialog-file-log.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            scope: $scope,
            preserveScope: true,
            controller: function() {
              $scope.cancel = function () {
                $mdDialog.hide();
              }
            }
            }).then(function () {
            });
          }
        });
      }

      $scope.stopProject = function (projectId) {
        PerformanceService.stop(projectId, function (data, status) {
          if (status == 200) {
            $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been stopped')));
            $scope.project.isBuilding = false;
          }
        });
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

      $scope.runLastScripts = function() {

        var selected = [];
        _.forEach($scope.project.lastScripts, function(sel) {
          selected.push(sel._id);
        });

        PerformanceService.run($scope.projectId, selected, function (data, status) {
          switch (status) {
            case 200:
              $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('You have submitted project job')));
              $scope.project.status = "RUNNING";
              $scope.project.log = undefined;
              break;
            case 204:
              $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been already running')));
              break;
            default:
          }
        });
      }

      var updateStatus = function(msg) {
        $scope.$apply(function() {
          var job = JSON.parse(msg.data);
          if (job.project_id === $scope.project._id) {

            $scope.project.last_running = job.runningTime;
            $scope.project.status = job.project_status;
            $scope.project.log = job.log;
            $scope.project.isBuilding = job.isBuilding;

            if ($scope.project.status === 'READY') {
              $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Completed')));
              job.scripts = job.scripts.length;
              job.created_date = job.runningTime;
              if (job.report && job.report.length > 0) {
                $scope.project.jobs.unshift(job);
              }
              
            }
          }
        })
      }

      EventService.feed(updateStatus);

    }]);
});


