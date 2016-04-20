define(['project/module', 'c3'], function (module, c3) {
	'use strict';

	module.registerDirective('performanceReport', ['$state', '$rootScope', '$timeout',
	 function ($state, $rootScope, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				reports : '=',
				init: '&',
				bindTo: '='
			},
			templateUrl: 'app/project/directives/performance-report.tpl.html',
			link: function($scope, element, attributes) {

				$scope.openReportEachSampler = function (report, indexNumber) {
					var origin_hits_time = getMinTime($scope.reports[0].hits_per_second[0], 'hits');
					var origin_trans_time = getMinTime($scope.reports[0].trans_per_second[0], 'transactions');
		      $state.go('app.project.performance-reports.job.sampler', {reportId : report._id, index: indexNumber, hit : origin_hits_time, trans : origin_trans_time});
		    }

    		$timeout(function () {
    			$scope.getWord = $rootScope.getWord;
    		}, 1000);

				   // round information
	      _.forEach($scope.reports, function (report) {

	      	report.summary.error_percent = _.round(report.summary.error_percent, 2);
	        report.summary.throughtput = _.round(report.summary.throughtput, 2);
	        report.summary.kb_per_second = _.round(report.summary.kb_per_second, 2);
	        report.summary.average = _.round(report.summary.average, 2);
	        report.summary.standard_deviation = _.round(report.summary.standard_deviation, 2);
	        report.summary.average_bytes = _.round(report.summary.average_bytes, 2);
	      });
	      // get data of summary report
	      $scope.summaryReport = _.find($scope.reports, function (report) {
	        return report.label == "*SummaryReport*";
	      });
	      $scope.summaryReport.script_name = $scope.reports[0].script_name;
	      // get data of all samplers
	      _.remove($scope.reports, function (report) {
	        return report.label == $scope.summaryReport.label;
	      });

	      //transform hit per second and transaction per second to arrays
      	_.forEach($scope.reports, function (report) {
      		
      		var trans = [];
      		var hits = [];
      		_.forIn(report.trans_per_second, function (time) {
      			trans.push(time);
      		});
      		_.forIn(report.hits_per_second, function (time) {
      			hits.push(time);
      		});
      		report.trans_per_second = trans;
      		report.hits_per_second = hits;
      	});

      	//get minimum time by report type
      	var getMinTime = function (firstObject, type) {
  				var minTimeStamp = firstObject.timestamp;
	      	_.forEach($scope.reports, function (report) {

	      		var tempObj = (type === 'transactions') ? report.trans_per_second : report.hits_per_second;
	      		_.forEach(tempObj, function (obj) {
	      			if (obj.timestamp < minTimeStamp) {
	      				minTimeStamp = obj.timestamp;
	      			}
	      		});
	      	});
	      	return minTimeStamp;
      	}

      	// create array to store list of time, value in pair for each sampler
      	var createSamplerDataArray = function (type) {
      		var datas = [];

      		var minTimeStamp = (type === 'transactions') ? getMinTime($scope.reports[0].trans_per_second[0], type) : getMinTime($scope.reports[0].hits_per_second[0], type);
      		_.forEach($scope.reports, function (report) {
      			var newObj = {
	      			label : report.label,
	      			time : {}
	      		};
	      		var tempInfo = (type === 'transactions') ? report.trans_per_second : report.hits_per_second;
	      		_.forEach(tempInfo, function (obj) {
      				var timeTmp = (obj.timestamp - minTimeStamp) / 1000;
		      		newObj.time[timeTmp] = obj.value;
		      	});
		      	datas.push(newObj);
	      	});

	      	return datas;
      	}

      	var arrayTransactions = createSamplerDataArray('transactions');
      	// present data to draw chart
      	var xs_value = {};
	      var columns_value = [];
      	var handleDataToDraw = function (data) {
		      var i = 0;
		      _.forEach(data, function (obj) {

		      	var label = obj.label;
		      	xs_value[label] = 'x'+i; 
		      	
		      	var column_x = [];
		      	var column_data = [];
		      	column_x.push('x'+i);
		      	column_data.push(label);
		      	i ++;
		      	_.forEach(obj.time, function (value, key) {
		      		column_x.push(key);
		      		column_data.push(value);
		      	});

						columns_value.push(column_x);
						columns_value.push(column_data); 	
		      });
      	}
      	// start to draw transactions per second chart

      	handleDataToDraw(arrayTransactions);

      	$timeout(function () {

      		$scope.show_trans = true;
      		$scope.show_hits = true;

      		var trans_chart = c3.generate({
		      	bindto: '#trans_chart_' + $scope.bindTo,
		      	data: {
		      		xs: xs_value,
		      		columns: columns_value
		      	}
		      });

		      var size = $(element).find('#trans_chart_' + $scope.bindTo + ' svg g').last().parent();
		      var chartSize = size[0].getBoundingClientRect().height + 300;

		      // start to create array to draw hits per second chart
	      	var arrayHits = createSamplerDataArray('hits');
	      	xs_value = {};
		      columns_value = [];
	      	handleDataToDraw(arrayHits);

		      var hits_chart = c3.generate({
		      	bindto: '#hits_chart_' + $scope.bindTo,
		      	data: {
		      		xs: xs_value,
		      		columns: columns_value
		      	}
		      });

		      trans_chart.resize({height: chartSize});
		      hits_chart.resize({height: chartSize});

		      $scope.toggle = function (type) {
	      		switch (type) {
	      			case 'trans_chart':
	      			  	//trans_chart.toggle();
	      				if ($scope.show_trans) {
	      					trans_chart.hide();
	      				} else trans_chart.show();
	      				$scope.show_trans = !$scope.show_trans;
	      				break;
	      			case 'hits_chart':
	      				if ($scope.show_hits) {
	      					hits_chart.hide();
	      					hits_chart.legend.hide();
	      					hits_chart.legend.show();
	      				} else hits_chart.show();
	      				$scope.show_hits = !$scope.show_hits;
	      				break;
	      			default: 

	      		}
	      	}
      	});

			}
		}
	}]);
})