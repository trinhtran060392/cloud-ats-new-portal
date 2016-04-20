define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('SuiteDetailCtrl', 
    ['SharedDataService', '$mdSidenav', '$scope', 'SuiteService', 'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', 
      function (SharedDataService, $mdSidenav, $scope, SuiteService, CaseService, $state, $stateParams, $mdDialog, $mdToast) {

    $scope.$parent.isSidenavOpen = false;
    $scope.$parent.isSidenavLockedOpen = false;

    $scope.toggleProjectNavLeft = function() {
      $mdSidenav('project-nav-left').toggle();
    };

		$scope.projectId = $stateParams.id;
    $scope.suiteId = $stateParams.suiteId;
    $scope.organizeMode = true;
    $scope.sharedData = SharedDataService;

    $scope.filterIsShow = false;

    SuiteService.get($scope.projectId, $scope.suiteId, function (data, status) {
      $scope.sharedData.suite = data;
      $scope.sharedData.suite.originCases = angular.copy($scope.sharedData.suite.cases);

      var overview = {
        name: $scope.sharedData.suite.project.name,
        state: 'app.project.overview',
        data: {
          id: $scope.projectId
        }
      }
      var suites = {
        name: 'Suites',
        state: 'app.project.keyword-suites',
        data: {
          id: $scope.projectId
        }
      }
      var suite = {
        name: $scope.sharedData.suite.name
      }
      $scope.breadcrumbs = [overview, suites, suite];
    });

    CaseService.references($scope.projectId, function(response) {
      $scope.cases = [];
      _.forEach(response, function(caze) {
        var found = _.filter($scope.sharedData.suite.cases, function (sel) {
          return sel._id == caze._id;
        });
        if (_.isEmpty(found)) {
          $scope.cases.push(caze);
        }
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

    $scope.remove = function ($index) {
      var caze = $scope.sharedData.suite.cases.splice($index, 1)[0];
      $scope.cases.push(caze);
    }

    $scope.removeInListCase = function (caze) {
      _.remove($scope.cases, function(sel) {
        return sel._id == caze._id;
      });
    }

	}]);
})