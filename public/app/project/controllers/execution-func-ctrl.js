define(['project/keyword-report-module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ExecutionFuncCtrl',
   ['$state', '$mdToast', 'EventService', '$rootScope','$scope', '$mdDialog', '$timeout','SuiteService', 'KeywordService','$stateParams',
   function ($state, $mdToast, EventService, $rootScope, $scope, $mdDialog, $timeout, SuiteService, KeywordService, $stateParams) {
   	$scope.projectId = $stateParams.id;
    var suiteSelected = [];
    $scope.currentStep = 1;
    $scope.checkSuiteSelected = true;

    KeywordService.get($scope.projectId, function(project) {
        $scope.project = project;
        $scope.project.browser = "firefox";
        $scope.project.browserVersion = "41.0.2";
        $scope.project.browserVersionFireFox = "41.0.2";
        $scope.project.browserVersionChrome = "46.0.2490.80";
        $scope.project.browserVersionIE = "11";
        $scope.project.seleniumVersion = "2.48.2";
        $scope.project.os = "ubuntu";
        
        $scope.$watch('project.browser', function(newValue, oldValue, scope) {
          if (newValue === 'ie') scope.project.os = "windows";
          else scope.project.os = "ubuntu";
        });

        $scope.$watch('project.os', function(newValue, oldValue, scope) {
          if (newValue === 'windows' && scope.project.browser !== 'ie') {
            scope.project.os = 'ubuntu';
          }
          if (newValue === 'ubuntu' && scope.project.browser === 'ie') {
            scope.project.os = 'windows'; 
          }
        });

      });
    
  	$scope.showExecutionFunctional = function(ev) {
      $mdDialog.show({
        templateUrl: 'app/project/views/keyword/dialog-execution-function.tpl.html',
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

  		        var options = {
  		          browser: $scope.project.browser,
  		          browser_version: $scope.project.browserVersion,
  		          selenium_version : $scope.project.seleniumVersion
  		        };
              $state.go('app.project.keyword-reports', {id : $scope.projectId});
  		        KeywordService.run($scope.projectId, suiteSelected, options, function (data, status) {
                $mdDialog.hide();
  		          switch (status) {
  		            case 201:
                    $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('You have submitted project job')));
                    break;
  		            case 204:
                    $mdToast.show($mdToast.simple().position('top right').textContent($rootScope.getWord('Your project has been already running')));
  		              break;
  		            default:
                    break;
  		          }
  		        });
            };
          }
        }).then(function () {
        });
    };

    SuiteService.list($scope.projectId, function(response) {
      $scope.suites = response.suites;
    });

    $scope.nextStepExecution = function(ev){
    	if ($scope.currentStep ===1 ) {
    	$scope.suiteSelected = suiteSelected ;
    	} else if($scope.currentStep === 2){
	        if($scope.project.browser === "firefox"){
              $scope.project.browserVersion = $scope.project.browserVersionFireFox ;
	        } else if($scope.project.browser === "chrome"){
              $scope.project.browserVersion = $scope.project.browserVersionChrome ;
	        } else if($scope.project.browser === "ie"){
              $scope.project.browserVersion = $scope.project.browserVersionIE ;
	        }
    	}
    	$scope.currentStep = $scope.currentStep + 1;
    };

    $scope.backStepExecution = function(ev){
    	$scope.currentStep = $scope.currentStep - 1;
    };

    $scope.selectSuite = function (suiteId) {
      if (_.indexOf(suiteSelected, suiteId) != -1) {
        _.remove(suiteSelected, function(sel) {
          return sel == suiteId;
        });
      } else {
        suiteSelected.push(suiteId);
      }
      if (suiteSelected.length > 0) $scope.checkSuiteSelected = false ;
      else $scope.checkSuiteSelected = true;
    };
    
  }]);
})