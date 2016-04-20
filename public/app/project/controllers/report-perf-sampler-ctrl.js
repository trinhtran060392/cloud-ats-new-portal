define(['project/module', 'c3'], function (module, c3) {

	'use strict';

	module.registerController('ReportPerformanceSamplerCtrl',['$scope', '$rootScope', '$state', '$stateParams', 'ReportService',
   function ($scope, $rootScope, $state, $stateParams, ReportService) {
		$scope.reportId = $stateParams.reportId;
    $scope.index = $stateParams.index;
    $scope.jobId = $stateParams.jobId;

    $scope.minTranTime = $stateParams.trans;
    $scope.minHitTime = $stateParams.hit;

		ReportService.get($scope.reportId, function (report, status) {

      report.summary.throughtput = _.round(report.summary.throughtput, 2);
      report.summary.kb_per_second = _.round(report.summary.kb_per_second, 2);
      report.summary.average = _.round(report.summary.average, 2);
      report.summary.standard_deviation = _.round(report.summary.standard_deviation, 2);
      report.summary.average_bytes = _.round(report.summary.average_bytes, 2);

      $scope.report = report;

      var xs_value = {'data' : 'x'};
      var columns_value = [];
      var x_value = ['x'];
      var dataset = ['data'];

      _.forIn($scope.report.hits_per_second, function (data) {
        var real_time = (data.timestamp - $scope.minHitTime) / 1000;
        x_value.push(real_time);
        dataset.push(data.value);
      });

      columns_value.push(dataset);
      columns_value.push(x_value);
      var chart = c3.generate({
        bindto: '.sampler-report-hits',
        data: {
          xs: xs_value,
          columns: columns_value
        }
      });

			x_value = ['x'];
      dataset = ['data'];
      _.forIn($scope.report.trans_per_second, function (data) {
        var real_time = (data.timestamp - $scope.minTranTime) / 1000;
        x_value.push(real_time);
        dataset.push(data.value);
      });

      columns_value.push(dataset);
      columns_value.push(x_value);
      
      var chart = c3.generate({
        bindto: '.sampler-report-trans',
        data: {
          xs: xs_value,
          columns: columns_value
        }
      });
		});

	}]);
});