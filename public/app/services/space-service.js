define(['acl/module'], function(module) {
  'use strict';

  module.registerFactory('SpaceService', ['$http', '$cookies', function($http, $cookies) {
    return {
      list: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/acl/spaces' ,
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
      createSpace: function (space, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/acl/space',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: space
        }
        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {

        });
      },
      get: function (spaceId, callback) {

         var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/acl/space/'+spaceId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        }

        $http(request).success(function (data, status) {
          callback (data, status);
        }).error(function (data, status) {
          console.log(status)
          switch (status) {
            case 404:
              $window.location.href = '/404.html';
          }
        });
      },
      update: function (space, callback) {
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/acl/space',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: space
        }

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {});
      },
      delete: function (id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/acl/space/'+id,
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
      listUser: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/acl/space/' ,
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
      delete: function (id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/acl/space',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: id
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        });
      }
    }
  }]);
});
