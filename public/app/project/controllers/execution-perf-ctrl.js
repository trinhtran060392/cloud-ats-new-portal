define(['project/module', 'lodash'], function (module, _) {
  
  'use strict';
   
  module.registerController('ExecutionPerfCtrl', ['$mdToast', '$scope', '$rootScope', '$mdDialog', '$state', '$stateParams', '$compile', '$templateRequest', 'ScriptService', 'PerformanceService',
   function($mdToast, $scope, $rootScope, $mdDialog, $state, $stateParams, $compile, $templateRequest, ScriptService, PerformanceService) {
   
    $scope.searchTerms = '';

    $scope.samplerReport = true; 
 		$scope.projectId = $stateParams.id;
    $scope.checkSscriptSelected = true ;

    var engines = [];
    var selected = [];
 		$scope.title = "EXECUTION";

    ScriptService.list($scope.projectId, function(response) {

      _.forEach(response, function (script) {
        script.showInfo = false;        
      });
      $scope.scripts = response;
      $scope.totalScripts = response.totalScripts;
    });

    PerformanceService.get($scope.projectId, function (response) {
      $scope.project = response;
      checkProjectStatus();
    });

    var checkProjectStatus = function() {
        if ($scope.project.status == 'RUNNING') {
          return false;
        }
        return true;
    };

    $scope.selectScript = function (script) {
      if (_.indexOf(selected, script._id) != -1) {
        _.remove(selected, function(sel) {
          return sel == script._id;
        });
      } else {
        selected.push(script._id);
      }
      if (selected.length > 0) $scope.checkSscriptSelected = false ;
      else $scope.checkSscriptSelected = true;
    };
 
    $scope.showExecutionFunctional = function(ev) {
      $mdDialog.show({
        templateUrl: 'app/project/views/performance/dialog-execution-performance.tpl.html',
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
              console.log('run');
              $scope.runPerformanceTest();
            };
          }
        }).then(function () {
        });
    };

    //run project with projectid and list scripts
    $scope.runPerformanceTest = function () {
      if (checkProjectStatus())
      PerformanceService.run($scope.projectId, selected, function(data, status) {
        $mdDialog.hide();
        switch (status) {
          case 200:
            $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('You have submitted project job')));
            break;
          case 204:
            $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been already running')));
            break;
          default:
            break;
        }

        $state.go('app.project.performance-reports', {id : $scope.projectId});
      });
    }

  }]);
});