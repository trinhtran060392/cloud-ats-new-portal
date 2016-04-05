define(['layout/module', 'c3'], function (module, c3) {
  'use strict';

  module.registerController('DashboardCtrl', [function() {

		var chart = c3.generate({
			bindto: '#chart',
	    data: {
	    	x: 'x',
        columns: [
        	['x', 'FHU', 'FPT Site Test', 'JIEM', 'DMO', 'CLOUDATS', 'FSU1.BU11', 'MockProject', 'MockProject', 'MockProject', 'MockProject'],
          ['pass', 30, 200, 100, 400, 150, 250, 200, 100, 400, 150],
          ['fail', 130, 100, 140, 200, 150, 50, 130, 100, 140, 200]
        ],
        type: 'bar'
		  },
      color: {
			  pattern: ['#039BE5', '#F44336']
			},
	    size: {
			  width: 1200
			},
	    bar: {
        width: 30 // this makes bar width 50% of length between ticks
	    },
	    axis: {
			  y: {
			    label: {
			       text: 'Number of projects',
			       position: 'outer-middle',
			    }
			  },
			  x: {
          type: 'category',
          tick: {
              multiline: false
          }
        }
			}

		});
  }]);
})