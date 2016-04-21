define(['project/module', 'lodash'], function (module, _) {
  
  'use strict';
   
  module.registerController('ExecutionPerfCtrl', ['$scope', '$rootScope', '$mdDialog', '$state', '$stateParams', '$compile', '$templateRequest', 'ScriptService', 'PerformanceService',
   function($scope, $rootScope, $mdDialog, $state, $stateParams, $compile, $templateRequest, ScriptService, PerformanceService) {
   
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
          $.SmartMessageBox({
            title: $rootScope.getWord("Project Execution Alert!"),
            content: $rootScope.getWord("Your project has been already running. Please back to overivew tab to track project progress"),
            buttons: $rootScope.getWord('[Go to overview]')
          }, function (ButtonPressed) {
            if (ButtonPressed === "Go to overview" || ButtonPressed === "概要に戻ります") {
              $state.go('app.performance', {id: $scope.projectId});
            }
          });
          return false;
        }

        return true;
    };

    $scope.selectScript = function (script) {
        if (_.indexOf(selected, script) != -1) {
          _.remove(selected, function(sel) {
            return sel == script;
          });
        } else {
          selected.push(script);
        }
        console.log(selected.length);
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
              $scope.runPerformanceTest();
            };
          }
        }).then(function () {
        });
    };

    //run project with projectid and list scripts
    $scope.runPerformanceTest = function () {
      if (checkProjectStatus())
      PerformanceService.run($stateParams.id, selected, function(data, status) {
        switch (status) {
          case 200:
              $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord('You have submitted project job'),
                color: '#296191',
                iconSmall: 'fa fa-check bounce animated',
                timeout: 3000
              });
              break;
            case 204:
              $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord('Your project has been already running'),
                color: '#296191',
                iconSmall: 'fa fa-check bounce animated',
                timeout: 3000
              });
              break;
            default:
              $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord('Can not submit your project job'),
                color: '#c26565',
                iconSmall: 'fa fa-ban bounce animated',
                timeout: 3000
              });

        }
        $state.go('app.project.performance-reports', {id : $scope.projectId});
      });
    }

  }]);
});