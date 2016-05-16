define(['acl/module'], function(module) {
  'use strict';

  module.registerFactory('RoleService', ['$http', '$cookies', function($http, $cookies) {
    return {
      list: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/acl/roles' ,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function (data, status) {
          callback(data);
        }).error(function (data, status) {

        });
      },
      create: function (role, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/acl/role',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: role
        }
        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {

        });
      },

    }
  }]);
});
