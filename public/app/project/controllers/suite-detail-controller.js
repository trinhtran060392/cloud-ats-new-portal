define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('SuiteDetailCtrl', ['$scope', 'SuiteService', 'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', function ($scope, SuiteService, CaseService, $state, $stateParams, $mdDialog, $mdToast) {

    $scope.$parent.isSidenavOpen = false;
    $scope.$parent.isSidenavLockedOpen = false;

		$scope.projectId = $stateParams.id;
    $scope.suiteId = $stateParams.suiteId;
    $scope.suite = {};
    $scope.organizeMode = false;
    $scope.filterIsShow = false;
    $scope.suite.cases = undefined;
    SuiteService.get($scope.projectId, $scope.suiteId, function (data, status) {
      $scope.suite = data; 
      $scope.suite.originCases = angular.copy($scope.suite.cases);
      CaseService.references($scope.projectId, function(response) {
        $scope.cases = response;
      });

    });

    $scope.save = function () {
      SuiteService.update($scope.projectId, $scope.suite, function (data, status) {

      });
      $scope.organizeMode = false;
    }

    $scope.edit = function () {
      $scope.organizeMode = true;
    }

    $scope.cancel = function () {
      $scope.suite.cases = $scope.suite.originCases;
      $scope.organizeMode = false;
    }


	}]);
})