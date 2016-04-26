define(['project/module'], function (module) {
	'use strict';

	module.registerController('SeleniumUploadCtrl', [
    '$scope', '$rootScope', '$state', '$stateParams', '$templateRequest', '$compile', '$cookies','SeleniumUploadService', '$mdDialog',
    function ($scope, $rootScope, $state, $stateParams, $templateRequest, $compile, $cookies, SeleniumUploadService, $mdDialog) {
      $scope.projectId = $stateParams.id;

      SeleniumUploadService.get($scope.projectId, function (data,status) {
        console.log(data);
        if(status === 404)
          $state.go('app.projects');
        $scope.project = data;
        if($scope.project.lastJobId) {
          getListReport($scope.project._id);
        }
      });

      var getListReport = function(projectId) {
        SeleniumUploadService.getListReport(projectId,function (data,status) {
          $scope.listLogs = data;
        });
      };

      $scope.showExecutionSeleniumUpload = function(ev) {
        $mdDialog.show({
          templateUrl: 'app/project/views/dialog-execution-selenium-upload.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.run = function() {
                $mdDialog.hide();
              };
            }
          })
      };
      $scope.showLogJobId = function(ev, jobId) {
        $mdDialog.show({
          templateUrl: 'app/project/views/dialog-log-selenium-upload.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
            }
          })
      };

      $scope.showUploadSeleniumProject = function(ev) {
        $mdDialog.show({
          templateUrl: 'app/project/views/dialog-selenium-upload.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.upload = function() {
                $mdDialog.hide();
              };
            }
          })
      };

      $scope.downloadResult = function(projectId,jobId) {
        SeleniumUploadService.download(projectId, jobId ,function (data,status) {
          var file = new Blob([data], {type: 'application/x-gzip'});
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(file);
          link.download="final-result.tar.gz";
          link.click();
        });
      }

	}]);
})