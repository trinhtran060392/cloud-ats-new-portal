define(['layout/module'], function (module) {

	'use strict';

	module.registerFactory('ProjectService', ['$http', '$cookies', function ($http, $cookies) {

		return {
      list: function (callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/projects',
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
      },
      create: function (name, creator, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name : name,
            creator: creator
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