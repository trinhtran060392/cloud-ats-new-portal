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
      listUser: function(roleId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/acl/listUser/' + roleId ,
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
      addUser: function (data, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/acl/role/add/user',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: data
        }
        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {

        });
      },
      removeUser: function (roleId, userId, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/acl/role/' + roleId + '/remove/user/' + userId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        }
        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {

        });
      },
      get: function (roleId, callback) {

         var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/acl/role/'+roleId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        }

        $http(request).success(function (data, status) {
          callback (data, status);
        }).error(function (data, status) {
          switch (status) {
            case 404:
              $window.location.href = '/404.html';
          }
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
