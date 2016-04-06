define(['layout/module', 'highcharts'], function (module, highcharts) {
  'use strict';

  module.registerController('DashboardCtrl', ['$scope', function($scope) {

    var names_10 = ['1.FHU', '2.FPT Site Test', '3.JIEM', '4.DMO', '5.CLOUDATS', '6.FSU1.BU11', '7.MockProject', '8.MockProject', '9.MockProject', '10.MockProject', '11.JIEM', '12.DMO', '13.CLOUDATS', '14.FSU1.BU11', '15.Fsu1', 'FHU', 'FPT Site Test d d ddddddddddddddddddd ddddddd', 'JIEM', 'DMO', 'CLOUDATS', 'FSU1.BU11', 'MockProject', 'MockProject', 'MockProject', 'MockProject'];
    var names_15 = ['1.FHU', '2.FPT Site Test', '3.JIEM', '4.DMO', '5.CLOUDATS', '6.FSU1.BU11', '7.MockProject', '8.MockProject', '9.MockProject', '10.MockProject', '11.JIEM', '12.DMO', '13.CLOUDATS', '14.FSU1.BU11', '15.Fsu1', 'FHU', 'FPT Site Test d d ddddddddddddddddddd ddddddd', 'JIEM', 'DMO', 'CLOUDATS', 'FSU1.BU11', 'MockProject', 'MockProject', 'MockProject', 'MockProject', 'JIEM', 'DMO', 'CLOUDATS', 'FSU1.BU11', 'Fsu1'];
    var passed_data_10 = [5, 3, 4, 7, 2, 5, 3, 4, 7, 2];
    var passed_data_15 = [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2];
    var ids_10 = ['id1','id2','id3','id4','id5','id6','id7','id8','id9','id10'];
    var ids_15 = ['id1','id2','id3','id4','id5','id6','id7','id8','id9','id10','id11','id12','id13','id14','id15'];
    var failed_data_10 = [2, 2, 3, 2, 1, 5, 3, 4, 7, 2];
    var failed_data_15 = [2, 2, 3, 2, 1, 5, 3, 4, 7, 2, 5, 3, 9, 4, 1];

    var draw = function (names, passes, fails, ids) {
      $('#chart').highcharts({
        chart: {
          type: 'column',
          width: 1200
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

    draw(names_10, passed_data_10, failed_data_10, ids_10);
    $scope.getProjects = function (total) {
      if (total === 10) {
        draw(names_10, passed_data_10, failed_data_10, ids_10);
      } else {
        draw(names_15, passed_data_15, failed_data_15, ids_15);
      }
    }
  	
  }]);
})