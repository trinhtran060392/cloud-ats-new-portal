define(['project/module'], function (module) {
  'use strict';

  module.registerController('ScriptsPerfActionCtrl', [
    'SharedDataService', '$scope', 'ScriptService', '$state', '$stateParams', '$mdDialog', 'Upload', '$cookies',
    function (SharedDataService, $scope, ScriptService, $state, $stateParams, $mdDialog, Upload, $cookies) {
      $scope.projectId = $stateParams.id;
      $scope.sharedData = SharedDataService;

      $scope.title = "TEST SCRIPTS";
      $scope.createDialog = function (ev) {
      $mdDialog.show({
        templateUrl: 'app/project/views/performance/dialog-create-script.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function() {
          $scope.script = {};
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.updateFile = function(element) {
              $scope.file = element.files[0];
          }

          $scope.updateCsvFile= function (element) {
            $scope.csvFiles = element.files;
          }

          $scope.createNewScript = function() {
              $scope.script.loops = 1;
              $scope.script.ram_up = 5;
              $scope.script.duration = "";
              $scope.script.number_threads = 200;
              $scope.script.number_engines = 1;
              $scope.script.samplers = "";
              ScriptService.createScript($scope.script, $scope.projectId, function(data, status){
                  if (status === 201) {
                  $mdDialog.hide();
                  $state.go('app.project.performance-scripts.wizard', {id : $scope.projectId, scriptId : data._id});
                }
              });
          };
          $scope.uploadNewScript = function(){
            var files = $scope.csvFiles;
            ScriptService.createScriptTestByUpload($scope.file, $scope.script.name, $stateParams.id , function (script,status) {
                if (script != null) {
                  $scope.totalScripts++;

                  $scope.file = undefined;
                  $scope.name = undefined;

                  _.forEach(files, function (file) {
                    Upload.upload({
                      url: appConfig.RestEntry + '/api/v1/project/performance/' + script._id + '/csv/upload',
                      data: {file: file},
                      headers: {
                        'X-AUTH-TOKEN': $cookies.get('authToken'),
                        'X-SPACE': $cookies.get('space')
                      }
                    }).then(function (resp) {
                     
                    });
                  });

                  $mdDialog.hide();
                  $state.go('app.project.performance-scripts.editor', {id : $scope.projectId, scriptId : script._id});
                }
              });
          }
        }
      })
    };

    }]);
})