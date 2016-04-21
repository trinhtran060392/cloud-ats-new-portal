define(['project/module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ExecutionFuncCtrl',
   ['$rootScope','$scope', '$mdDialog', '$timeout','SuiteService', 'KeywordService','$stateParams',
   function ($rootScope, $scope, $mdDialog, $timeout, SuiteService, KeywordService, $stateParams) {
   	$scope.projectId = $stateParams.id;
    var suiteSelected = [];
    $scope.currentStep = 1;
    $scope.checkSuiteSelected = true;

    var checkProjectStatus = function() {
        if ($scope.project.status == 'RUNNING') {
          $.SmartMessageBox({
            title: $rootScope.getWord('Project Execution Alert') +'!',
            content: $rootScope.getWord('Your project has been already running. Please back to overview tab to track project progress'),
            buttons: '['+$rootScope.getWord('Go to report')+']'
          }, function (ButtonPressed) {
            if (ButtonPressed === $rootScope.getWord('Go to overview')) {
              $state.go('app.project.keyword-reports', {id: $scope.projectId});
            }
          });
          return false;
        }

        return true;
      };

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

        checkProjectStatus();
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

            	if (checkProjectStatus())
		        var options = {
		          browser: $scope.project.browser,
		          browser_version: $scope.project.browserVersion,
		          selenium_version : $scope.project.seleniumVersion
		        };
		        KeywordService.run($scope.projectId, suiteSelected, options, function (data, status) {
		          switch (status) {
		            case 201:
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
		                content: $rootScope.getWord('Can not submmit your project job'),
		                color: '#c26565',
		                iconSmall: 'fa fa-ban bounce animated',
		                timeout: 3000
		              });

		          }
		          $state.go('app.keyword.keyword-reports', {id:$scope.projectId});
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