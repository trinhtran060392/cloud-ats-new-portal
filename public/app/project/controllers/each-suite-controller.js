define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('EachSuiteCtrl', ['$scope', 'SuiteService', 'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', function ($scope, SuiteService, CaseService, $state, $stateParams, $mdDialog, $mdToast) {

    $scope.$parent.isSidenavOpen = false;
    $scope.$parent.isSidenavLockedOpen = false;

		$scope.projectId = $stateParams.id;
    $scope.suiteId = $stateParams.suiteId;
    $scope.suite = {};
    $scope.organizeMode = false;
    $scope.filterIsShow = false;
    $scope.suite.cases = undefined;
    SuiteService.get($scope.projectId, $scope.suiteId, function (data, status) {
      $scope.suite.cases = data;
      $scope.suite.originCases = angular.copy($scope.suite.cases);
      CaseService.references($scope.projectId, function(response) {
        $scope.cases = response;
        console.log($scope.cases);
      });

    });

    $scope.save = function () {
      console.log($scope.suite.cases);
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