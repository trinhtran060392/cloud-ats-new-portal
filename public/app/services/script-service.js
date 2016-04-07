define(['performance/module'], function (module) {
  'use strict';

  module.registerFactory('ScriptService', ['$http', '$cookies', '$window', function($http, $cookies, $window) {
    return {
      list: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/performance/' + projectId + '/scripts' ,
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
      createScriptTestByUpload: function (file, name, project_id, callback) {
        var formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project/performance/' + project_id + '/upload',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
            'Content-Type': undefined
          },
          data: formData
        }

        $http(request).success(function (data, status){
          callback(data, status);
        }).error(function() {});
      },
      createScript: function (script, projectId, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+ projectId + '/script',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: script
        }
        $http(request).success(function (data, status) {
          callback(data);
        }).error(function (data, status) {

        });
      },
      get: function (projectId, id, callback) {

         var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+ projectId +'/script/'+id,
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
      listCsv: function (id, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+id+'/csv/list',
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
      getCsvData: function (scriptId, csvId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+scriptId+'/csv/'+csvId,
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
      deleteCsvData: function (scriptId, csvId, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+scriptId+'/csv/delete/'+csvId,
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
      updateTempCSVData: function (file, name, scriptId, csvId, callback) {
        var formData = new FormData();
        formData.append("file", file);
        formData.append("filename", name);
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+scriptId+'/csv/update/'+csvId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
            'Content-Type': undefined
          },
          data: formData
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
      deleteTempCSVData: function (scriptId, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+scriptId+'/csv/deletetemp',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
            'Content-Type': undefined
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
      delete: function (projectId, id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+ projectId+ '/script/'+id,
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
      update: function (projectId, script, callback) {
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/project/performance/'+ projectId +'/script',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: script
        }

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {});
      }
    }
  }]);
});