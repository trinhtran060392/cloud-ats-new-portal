define(['performance/module'], function(module) {
  'use strict';

  module.registerFactory('ReportService', ['$http', '$cookies', function($http, $cookies) {
    return {
      get: function(id, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/performance/report/sampler/'+id,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      },
      report: function (projectId, jobId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/performance/reports/'+projectId+'/'+jobId,
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