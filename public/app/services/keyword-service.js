define(['keyword/module'], function(module) {
  'use strict';

  module.registerFactory('KeywordService', ['$http', '$cookies', function($http, $cookies) {
    return {

      run: function(projectId, listSuite, options, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId + '/run',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            suites: listSuite,
            options: options
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data, status);
        });
      },
      stop: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId + '/stop',
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
      },
      list: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keywords',
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

      get: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/' + projectId,
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

      create: function(name, valueDelay,callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/project/keyword',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name: name,
            valueDelay: valueDelay
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },
      update: function (id, name, valueDelay, callback) {
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/project/keyword',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name: name,
            id: id,
            valueDelay: valueDelay
          }
        };

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {
          callback(data, status);
        });
      },
      delete: function (id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/project/keyword',
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
      getKeywords: function(callback) {
        $http.get('api/keywords.json').success(function(data) {
          if (typeof callback === 'function') {
            callback(data);
          }
        });
      },

      getReport : function(projectId,job_id,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/report/'+ job_id,
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
      updateStatus: function (projectId, job_id, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/report/status/'+ job_id,
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
      getListReport : function(projectId,index,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/reports?index='+index,
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
      getReportCase : function(projectId, jobId ,caseReportId,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/report/'+jobId+'/case/'+caseReportId,
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
      log: function (projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+projectId+'/logs',
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
      },
      jobLog: function (projectId, jobId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+projectId+'/job/' + jobId +'/logs',
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
      },
      download : function(projectId,job_id,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/download/'+ job_id,
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
      suiteReports : function(projectId, jobId, suiteId, suiteReportId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/report/'+ jobId + '/suite/'+suiteId+'/'+suiteReportId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
          }
        };

        $http(request).success(function(data, status, headers) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data,status);
        });
      },
      lastestJobs : function(projectId, jobId, suiteId, suiteReportId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/report/'+ jobId + '/suite/'+suiteId+'/'+suiteReportId+'/lastest/jobs',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
          }
        };

        $http(request).success(function(data, status, headers) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data,status);
        });
      },
      showImage : function (projectId, jobId, suiteId, suiteReportId, caseReportId, value, isName, callback) {
        var request = {
          method: 'GET',
          responseType: "arraybuffer",
          url: appConfig.RestEntry + '/api/v1/project/keyword/'+ projectId +'/report/'+ jobId + '/suite/'+suiteId+'/'+suiteReportId+'/case/'+caseReportId+'/image?step='+value+'&isName='+isName,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space'),
          }
        };

        $http(request).success(function(data, status, headers) {
          callback(data, status);
        }).error(function(data, status) {
          callback(data,status);
        });
      }
    }
  }]);
});