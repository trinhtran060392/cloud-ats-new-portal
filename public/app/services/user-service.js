define(['app'], function(app) {
  'use strict';

  app.factory('UserService', ['$http', '$q', '$cookies', '$rootScope', '$window', '$state',
    function($http, $q, $cookies, $rootScope, $window, $state){
    return {
      spaces: function(){
        var dfd = $q.defer();

        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/user/spaces',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken')
          }
        }

        $http(request)
        .success(function(response) {
          dfd.resolve(response);
        })
        .error(function(data, status) {
          switch (status) {
            case 403:
              $state.go('403');
              break;
            case 401:
              $state.go('401');
              break;
          }
          dfd.reject;
        });

        return dfd.promise;
      },

      go: function(space, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/user/go/' + space._id,
          headers: {
           'X-AUTH-TOKEN': $cookies.get('authToken') 
          } 
        }

        $http(request).success(function(context) {
          $window.sessionStorage.setItem('context', JSON.stringify(context));
          $rootScope.context = context;
          
          var expires = new Date();
          expires.setDate(expires.getDate() + 365);

          var spaceId = context.space !== undefined ? context.space._id : null;

          if (spaceId != null) {
            $cookies.put('space', spaceId, {
              expires: expires
            });
          } else {
            $cookies.remove('space');
          }
          
          if (typeof callback === 'function') {
            callback(context);
          }
        });
      }
    };
  }])
});