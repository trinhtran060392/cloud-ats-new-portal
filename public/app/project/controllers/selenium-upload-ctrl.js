define(['project/module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('SeleniumUploadCtrl', [
    '$scope', '$rootScope', '$state', '$stateParams', '$templateRequest', '$compile', '$cookies','SeleniumUploadService', '$mdDialog','$mdToast', 'EventService',
    function ($scope, $rootScope, $state, $stateParams, $templateRequest, $compile, $cookies, SeleniumUploadService, $mdDialog, $mdToast, EventService) {
      $scope.projectId = $stateParams.id;

      var checkProjectStatus = function() {
        if ($scope.project.status == 'RUNNING') {
          $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been already running')));
          return false;
        }

        return true;
      }

      SeleniumUploadService.get($scope.projectId, function (data,status) {
        if(status === 404)
          $state.go('app.project.selenium-upload');
        $scope.project = data;
        console.log(data);
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
                if (checkProjectStatus())
                $scope.project.status = "RUNNING";
                $scope.project.log = undefined;
                $scope.project.watchUrl = undefined

                SeleniumUploadService.run($scope.projectId, function (data, status) {
                  switch (status) {
                    case 201:
                      $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('You have submitted project job')));
                      break;
                    case 204:
                      $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been already running')));
                      break;
                    default:
                      $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Can not submmit your project job')));
                  }
                });
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
              $scope.uploadSelenium = function() {
                upload($scope.projectId);
                $mdDialog.hide();
              };
            }
          })
      };
      $scope.showlogJob = function(ev) {
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

      $scope.uploadFile = function(element) {
        var $inputFile = $('input[name="chooseFile"]').parent();
        $inputFile.removeClass("has-error");
        $scope.file = element.files[0];
      }

      var upload = function(projectId) {
        if($scope.file === undefined) {
          $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Not found file upload !')));
        } else if($scope.file){
          var fileName = $scope.file.name;
          var fileSize = $scope.file.size/1024;
          var lastIndex = _.lastIndexOf(fileName, ".");
          var extension = fileName.substring(lastIndex + 1);

          if(fileSize/1024 > 10) {
            $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('File size is too large. The maximum file size allowed is 10 Mb.')));
            $scope.file = undefined;
            return;
          }

          SeleniumUploadService.upload(projectId,$scope.file,function(data,status){
            if(status === 201) {
              $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Upload success !')));
            } else {
              $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('File is not correct format !')));
              $scope.file = undefined;
            }
          });
        }
      };

      $scope.downloadResult = function(projectId,jobId) {
        SeleniumUploadService.download(projectId, jobId ,function (data,status) {
          var file = new Blob([data], {type: 'application/x-gzip'});
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(file);
          link.download="final-result.tar.gz";
          link.click();
        });
      };

      $scope.stopProject = function (projectId) {
        SeleniumUploadService.stop(projectId, function (data, status) {
          if (status == 200) {
            $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been already stopped')));
            $scope.project.status = 'READY';
          }

        });
      };

      var updateStatus = function(msg) {
        $scope.$apply(function() {
          var job = JSON.parse(msg.data);
          console.log(job);
          if (job.project_id === $scope.project._id) {
            $scope.project.status = job.project_status;
            $scope.project.watchUrl = job.watch_url;
            $scope.project.log = job.log;
            $scope.project.isBuilding = job.isBuilding;
            if(job.project_status === 'READY') {
              var log = {
                created_date : undefined,  
                jobId: undefined,
                log: undefined,
                result: undefined
              };
              SeleniumUploadService.getReport($scope.projectId, job._id, function (data, status) {
                if(status === 404) return;
                $scope.project.lastRunning = data.created_date;
                log.created_date = data.created_date;
                log.jobId = data.jobId;
                log.log = data.log;
                log.result = data.result;
                $scope.listLogs.unshift(log);
                $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('The job ') + job._id + $rootScope.getWord(' has completed.')));
              });
            }
          }
        })
      };

      EventService.feed(updateStatus);

	}]);
})