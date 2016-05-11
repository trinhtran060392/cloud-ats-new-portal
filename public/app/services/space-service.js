define(['acl/module'], function(module) {
  'use strict';

  module.registerFactory('SpaceService', ['$http', '$cookies', function($http, $cookies) {
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
      }
    }
  }]);
})