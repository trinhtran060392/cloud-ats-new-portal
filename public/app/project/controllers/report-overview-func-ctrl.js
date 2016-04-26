define(['project/module', 'lodash'], function (module, _) {
  'use strict';
  module.registerController('ReportFuncCtrl', 
    ['$mdDialog', '$scope', '$rootScope', '$state', '$stateParams', '$templateRequest', '$compile', '$cookies', 'KeywordService',
    function($mdDialog, $scope, $rootScope, $state, $stateParams, $templateRequest, $compile, $cookies, KeywordService) {

      $scope.projectId = $stateParams.id;

      $scope.suiteReports = [];

      $scope.dataReports = [];

      $scope.project = null;

      $scope.query = {
        'current': 1,
        'total': 0
      };

      $scope.delay = {
        value:0
      };
      $scope.listReports = [];
      
      KeywordService.get($scope.projectId, function(response) {
        $scope.project = response;
        if($scope.project.lastJobId) {
          getListReport($scope.project._id, 1);
        }
        console.log($scope.project);
      });

      $scope.$watch('query.current', function (newPage, oldPage) {
        if($scope.project) {
          getListReport($scope.project._id, newPage);
        }
      });

      $scope.redirectTo = function(jobId) {
        $state.go('app.project.keyword-reports.reportJob', {id: $scope.projectId, jobId: jobId });
      }

      var getListReport = function(projectId, index) {

        KeywordService.getListReport(projectId, index, function(dataRes,status) {
          if (dataRes.length) {
            $scope.query.total = dataRes[0].total;
          }
          _.forEach(dataRes, function (obj) {
            if (obj.numberFailedSuite > 0) {
              obj.test_result = 'Fail';
            } else obj.test_result = 'Pass';
          });
          $scope.listReports = dataRes;
        });
      }

      $scope.downloadResult = function(projectId,jobId) {
        KeywordService.download(projectId, jobId ,function (data,status) {
          console.log(data);
          var file = new Blob([data], {type: 'application/x-gzip'});
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(file);
          link.download="final-result.tar.gz";
          link.click();
        });
      }

      $scope.viewLog = function(ev) {
        console.log(ev);
        console.log($scope.project);
        KeywordService.log($scope.project._id, function (data, status) {
          console.log(data);
          if (status == 200) {
            $scope.project.log = data;
            $mdDialog.show({
            templateUrl: 'app/project/views/keyword/dialog-file-log.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            scope: $scope,
            preserveScope: true,
            controller: function() {
              
            }
            }).then(function () {
            });
          }
        });
    }
  }]);
});