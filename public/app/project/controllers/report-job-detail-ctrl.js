define(['project/module', 'highcharts', 'lodash'], function (module, highcharts, _) {
  'use strict';
  module.registerController('ReportJobDetailCtrl', 
    ['$scope', '$rootScope','$window', '$state', '$stateParams', '$templateRequest', '$compile', '$cookies', 'KeywordService','$mdDialog',
    function($scope, $rootScope,$window, $state, $stateParams, $templateRequest, $compile, $cookies, KeywordService, $mdDialog) {

      $scope.projectId = $stateParams.id;

      $scope.jobId = $stateParams.jobId;

      $scope.suiteReports = [];

      $scope.listSuiteReports = [];

      $scope.dataReports = [];

      var names = [];
      var passes = [];
      var fails = [];
      var skips = [];
      var ids = [];

      var getDataReport = function(data) {
        var i = 0;
        _.forEach(data,function(obj,key) {
            names.push((++i) + '.' + obj.name);
            passes.push(obj.totalPass);
            fails.push(obj.totalFail);
            skips.push(obj.totalSkip);
            ids.push(obj._id);
        })
      };

      KeywordService.getReport($scope.projectId, $scope.jobId, function(data,status) {
          if(status === 404) {
            $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord("Report not found"),
                color: '#296191',
                iconSmall: 'fa fa-check bounce animated',
                timeout: 3000
              });
          } else {
              _.forEach(data, function (obj) {
              if (obj.totalFail === 0) {
                obj.test_result = 'Pass';
              } else obj.test_result = 'Fail';
            });
            $scope.suiteReports = data;
            getDataReport(data);
            draw(names, passes, fails, ids);
          }
      });

      $scope.redirectToSuiteReport = function(suiteId, suiteReportId) {
        $state.go('app.project.keyword-reports.reportJob.reportSuite', {'suiteId': suiteId, 'suiteReportId': suiteReportId});
      }
      var showDialogContentLog= function(ev) {
      $mdDialog.show({
        templateUrl: 'app/project/views/keyword/dialog-file-log.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function () {
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
          }
      }).then(function () {
      });
    };

      $scope.project = {};
      $scope.viewLog = function () {
      KeywordService.jobLog($scope.projectId, $scope.jobId, function (data, status) {
          if (status == 200) {
            $scope.project.log = data;
          }
          showDialogContentLog();
        });
      };
       
      $scope.width = $window.innerWidth;
      var draw = function (names, passes, fails, skips, ids) {
      $('#chart').highcharts({
        chart: {
          type: 'column',
          width: $scope.width - 245
        },
        colors: ['#039BE5', '#F44336', '#ffaa2a'],
        title: {
          text: 'All Suites'
        },
        yAxis: {
          min: 0,
          tickInterval: 2,
          title: {
              text: 'Number of Cases'
          }
        },
        xAxis: {
          categories: names,
          crosshair: true
        },
        series: [
        {
          name: 'Passed',
          data: passes
        }, 
        {
          name: 'Failed',
          data: fails
        }, 
        {
          name: 'Skiped',
          data: skips
        }],
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  var index = this.category.indexOf('.');
                  var id_index = this.category.substring(0,index);
                }
              }
            }
          }
        },
      });
    }

  }]);
});