define(['keyword/module'], function (module) {
  'use strict';

  module.registerFactory('SuiteService', ['$http', '$cookies', function($http, $cookies) {
    
    return {

      list: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId + '/suites' ,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data);
        }).error(function(data, status) {

        });
      },

      create: function(projectId, suite, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId + '/suite' ,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: suite
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data, status)
        });        
      },

      update: function(projectId, suite, callback) {
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId + '/suite' ,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: suite
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data, status)
        });        
      },

      delete: function(projectId, suiteId, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId + '/suite/' + suiteId ,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data, status)
        });        
      }
    }

  }]);
});