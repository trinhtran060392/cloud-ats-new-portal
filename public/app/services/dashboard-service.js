define(['layout/module'], function (module) {

	'use strict';

	module.registerFactory('DashboardService', ['$http', '$cookies', function ($http, $cookies) {

		return {
      summary: function (callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/dashboard/summary',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data, status);
        });
      }
		}
	}]);
})