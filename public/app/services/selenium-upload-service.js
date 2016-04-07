define(['selenium/module'], function(module) {
  'use strict';

  module.registerFactory('SeleniumUploadService', ['$http', '$cookies', function($http, $cookies) {
    return {

      run: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/selenium/' + projectId + '/run',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      delete: function (id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/project/selenium',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: id
        };

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {
          callback(data, status);
        });
      },

      list: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/seleniums',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      create: function(name, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project/selenium',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name: name
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      get: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/selenium/' + projectId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data,status);
        });
      },

      getReport : function(projectId,job_id,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/selenium/'+ projectId +'/report/'+ job_id,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data,status);
        });
      },

      download : function(projectId,job_id,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/selenium/'+ projectId +'/download/'+ job_id,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
          },
          responseType: 'blob'
        };

        $http(request).success(function(data, status, headers) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data,status);
        });
      },

      getListReport : function(projectId,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/selenium/'+ projectId +'/reports',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },
      
      upload : function(projectId,file,callback) {
          var formData = new FormData();
          formData.append('file',file);
          var request = {
            method: 'POST',
            url: appConfig.RestEntry + '/api/v1/project/selenium/'+ projectId + '/upload',
            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken'),
              'Content-Type': undefined
            },
            data:formData
          }

          $http(request)
          .success(function (data,status) {
            callback(data,status);
          })
          .error(function(data,status) {
            callback(data,status);
          });
      },
      update: function (id, name, callback) {
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/project/selenium',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name: name,
            id: id
          }
        };

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {
          callback(data, status);
        });
      },
      stop: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/selenium/' + projectId + '/stop',
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
});