define(['project/module', 'highcharts', 'lodash'], function (module, highcharts, _) {
  'use strict';

  module.registerController('ReportSuiteDetailCtrl', ['$scope', '$state','$window', '$stateParams', 'KeywordService',
   function ($scope, $state, $window, $stateParams, KeywordService) {
    
    $scope.jobId = $stateParams.jobId;
    $scope.suiteId = $stateParams.suiteId;
    $scope.projectId = $stateParams.id;
    $scope.suiteReportId = $stateParams.suiteReportId;
    $scope.case_reports = [];

    var getReport = function () {
      KeywordService.suiteReports($scope.projectId, $scope.jobId, $scope.suiteId, $scope.suiteReportId, function (response, status) {
        var data = response;
        _.forEach(data, function (obj) {
          if (obj.useDataDriven) {
            var caze = {
              data_source:[]
            };
            caze.name = obj.name;
            caze.case_id = obj.case_id;
            caze.useDataDriven = true;
            var dataset = _.filter(data, function (object) {
              return obj.case_id === object.case_id;
            });

            var failedCase = _.filter(dataset, function (set) {
              return set.isPass == false;
            });
            if (failedCase.length > 0) {
              caze.isPass = false;
            } else caze.isPass = true;
            caze.data_source = dataset;
            var index = _.find($scope.case_reports, function (tmp) {
              return tmp.case_id === caze.case_id;
            });

            if (!index) {
              $scope.case_reports.push(caze);
            }
          } else {
            $scope.case_reports.push(obj);
          }
        });
        var numberOfPassedCase = 0;
        var numberOfFailedCase = 0;
        for (var i = 0; i < $scope.case_reports.length; i++) {
          if ($scope.case_reports[i].isPass == true) {
            numberOfPassedCase ++  ;
          } else if ($scope.case_reports[i].isPass == false) {
            numberOfFailedCase ++  ;
          }
        }
        draw(numberOfPassedCase,numberOfFailedCase);
      });
    }

    KeywordService.lastestJobs($scope.projectId, $scope.jobId, $scope.suiteId, $scope.suiteReportId, function (data, status) {
      $scope.suites = JSON.parse(data.suites);
    });

    getReport();
    $scope.redirectToTestCaseReport = function(id) {
      $state.go('app.project.keyword-reports.reportJob.reportSuite.reportCase', {'caseReportId': id});
    }

    $scope.goToJobReport = function (id) {
      $state.go('app.project.keyword-reports.reportJob', {'jobId' : id});
    };

    $scope.width = $window.innerWidth;
    var draw = function (passes, fails) {
      $('#suiteChart').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        colors: ['#039BE5', '#F44336'],
        title: {
            text: ''
        },
        tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
        {
          name: 'Data',
          colorByPoint: true,
          data: [{
                    name: 'Passed',
                    y: passes
                }, {
                    name: 'Failed',
                    y: fails
                }]
        }],
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
      });
    }
  }]);
});