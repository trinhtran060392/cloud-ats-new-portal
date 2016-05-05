define(['project/module','lodash'], function (module, _) {
  
  'use strict';

  module.registerController('ScriptsPerfCtrl', ['SharedDataService', '$mdToast', '$scope', '$rootScope', '$mdDialog', '$state','$stateParams', '$templateRequest', '$compile', 'ScriptService',
    function(SharedDataService, $mdToast, $scope, $rootScope, $mdDialog, $state, $stateParams, $templateRequest, $compile, ScriptService) {
 	
 		$scope.projectId = $stateParams.id;
    $scope.sharedData = SharedDataService;


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