define(['acl/module'], function(module) {
  'use strict';

  module.registerFactory('TenantAdminService', ['$http', '$cookies', function($http, $cookies) {
    return {
      list: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/spaces',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      },
      delete: function (id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/space',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: id
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      },
      create: function (name, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/space/'+name,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      },
      search: function (text, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/user/search/'+text,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      },
      addAdmin: function (user, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/tenant/admin',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: user
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      }
    }
  }]);
})