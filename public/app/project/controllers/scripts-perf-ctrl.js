define(['project/module','lodash'], function (module, _) {
  
  'use strict';

  module.registerController('ScriptsPerfCtrl', ['$mdToast', '$scope', '$rootScope', '$mdDialog', '$state','$stateParams', '$templateRequest', '$compile', 'ScriptService', 'Upload', '$cookies',
    function($mdToast, $scope, $rootScope, $mdDialog, $state, $stateParams, $templateRequest, $compile, ScriptService, Upload, $cookies) {
 	
 		$scope.projectId = $stateParams.id;

 		$scope.title = "TEST SCRIPTS";

    var parse = function (timestamp) {

      var date = new Date(timestamp);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

      return result;
    }

    ScriptService.list($scope.projectId, function(response) {
      _.forEach(response, function (script) {
        script.created_date = parse(script.created_date);
      });
      $scope.scripts = response;
      $scope.totalScripts = response.length;
    });

    $scope.clickScript = function (ev, script) {
      if (script.raw) {
        $state.go('app.project.performance-scripts.editor', {id : $scope.projectId,scriptId : script._id});
      } else {
        $state.go('app.project.performance-scripts.wizard', {id : $scope.projectId,scriptId : script._id});
      }
    };

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
              $scope.script.loops = "";
              $scope.script.ram_up = "";
              $scope.script.duration = "";
              $scope.script.number_threads = "";
              $scope.script.number_engines = "";
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
                  $scope.scripts.push(script);
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
    }

    $scope.delete = function (ev, id) {
      var confirm = $mdDialog.confirm()
      .title('Would you like to delete this script?')
      .targetEvent(ev)
      .clickOutsideToClose(true)
      .ok('Delete')
      .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
         ScriptService.delete($scope.projectId, id, function (data, status) {
          if (status === 202) {
            _.remove($scope.scripts, function (script) {
              return script._id === id;
            });
            $mdToast.show($mdToast.simple().position('top right').textContent('The script has been deleted!'));
          }
         });
        }, function() {
      });
    }

    $scope.clone = function (ev, id, name) {
      $mdDialog.show({
          
        templateUrl: 'app/projects/views/clone-data-dialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function () {

          $scope.oldData = name;
          $scope.data_name = undefined;
          $scope.title = "Script";

          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            ScriptService.clone($scope.projectId, id, $scope.data_name, function (data, status){
              if (status === 200) {
                data.created_date = parse(data.created_date);
                $scope.scripts.push(data);
                $mdDialog.hide();
                $mdToast.show($mdToast.simple().position('top right').textContent('The script has been cloned!'));
              }
            });
          };
        }
      })
    }
  }]);
});