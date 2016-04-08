define(['layout/module', 'highcharts', 'lodash'], function (module, highcharts, _) {
  'use strict';

  module.registerController('DashboardCtrl', ['$scope', '$window', 'DashboardService', '$cookies', function($scope, $window, DashboardService, $cookies) {

    var names = [];
    var passes = [];
    var fails = [];
    var ids = [];
    DashboardService.summary(function (data, status) {
      if (!data) {
        return;
      }
      var recents = JSON.parse(data.recentProjects);
      var topbiggest = JSON.parse(data.topBiggestProject);
      var topKeywordFail = JSON.parse(data.topKeywordFail);
      var topKeywordPass = JSON.parse(data.topKeywordPass);
      var persProjects = JSON.parse(data.persProjects);
      _.forEach(recents, function (data) {
        names.push('1.'+data.x);
        passes.push(data.P);
        fails.push(data.F);
        ids.push(data._id);
      });
      draw(names, passes, fails, ids);

      _.forEach(topKeywordPass, function (project) {
        project.percentPass = _.round(project.percentPass, 2);
        project.percentFail = _.round(project.percentFail, 2);
      });
      $scope.top_keyword_projects_pass = topKeywordPass;

      _.forEach(topKeywordFail, function (project) {
        project.percentPass = _.round(project.percentPass, 2);
        project.percentFail = _.round(project.percentFail, 2);
      });
      $scope.top_keyword_projects_fail = topKeywordFail;

      $scope.top_biggest_project = topbiggest;

      // top error performance project
      _.forEach(persProjects, function (project) {
        project.error_percent = _.round(project.error_percent, 2);
      });
      $scope.persProjects = persProjects;
    });
    
    $scope.width = $window.innerWidth;
    
    var draw = function (names, passes, fails, ids) {
      $('#chart').highcharts({
        chart: {
          type: 'column',
          width: $scope.width - 80
        },
        colors: ['#039BE5', '#F44336'],
        title: {
          text: 'Recent Finished Projects'
        },
        yAxis: {
          min: 0,
          tickInterval: 2,
          title: {
              text: 'Number of projects/tenant'
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
        }],
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  var index = this.category.indexOf('.');
                  var id_index = this.category.substring(0,index);
                  console.log(ids[id_index - 1]);
                }
              }
            }
          }
        },
      });
    }

    $scope.getProjects = function (total) {
      if (total === 10) {
      } else {
      }
    }

    $scope.goProject = function (project) {
      console.log(project._id);
    }
  	
  }]);
})