define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('SuiteDetailCtrl', 
    ['$mdSidenav', '$scope', 'SuiteService', 'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', 
      function ($mdSidenav, $scope, SuiteService, CaseService, $state, $stateParams, $mdDialog, $mdToast) {

    $scope.$parent.isSidenavOpen = false;
    $scope.$parent.isSidenavLockedOpen = false;

    $scope.toggleProjectNavLeft = function() {
      $mdSidenav('project-nav-left').toggle();
    };

		$scope.projectId = $stateParams.id;
    $scope.suiteId = $stateParams.suiteId;
    $scope.hasChanged = false;

    var detectChanged = function(newCases, oldCases) {
      var changed = false;
      if(newCases.length !== oldCases.length) changed = true;
      else {
        for(var i = 0; i < newCases.length; i++) {
          if (newCases[i]._id !== oldCases[i]._id) {
            changed = true;
            break;
          }
        }
      }
      return changed;
    }

    var initData = function() {
      SuiteService.get($scope.projectId, $scope.suiteId, function (data, status) {
        $scope.suite = data;
        $scope.suite.originCases = angular.copy($scope.suite.cases);

        CaseService.references($scope.projectId, function(response) {
          $scope.listCases = [];
          _.forEach(response, function(caze) {
            var found = _.filter($scope.suite.cases, function (sel) {
              return sel._id == caze._id;
            });
            if (_.isEmpty(found)) {
              $scope.listCases.push(caze);
            }
          });
          $scope.originListCases = angular.copy($scope.listCases);
        });

        var overview = {
          name: $scope.suite.project.name,
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
          name: $scope.suite.name
        }
        $scope.breadcrumbs = [overview, suites, suite];
      });
    }

    initData();
    
    $scope.$watch('suite.cases', function(newCases, oldCases) {
      if (newCases !== oldCases && detectChanged(newCases, $scope.suite.originCases)) {
        $scope.hasChanged = true;
      } else {
        $scope.hasChanged = false;
      }
    }, true);

    $scope.save = function () {
      var suite = {};
      suite._id = $scope.suite._id;
      suite.name = $scope.suite.name;
      suite.cases = $scope.suite.cases;
      suite.sequence_mode = $scope.suite.sequence_mode;
      SuiteService.update($scope.projectId, suite, function (data, status) {
        if (status == 200) {
          $mdToast.show($mdToast.simple().position('top right').textContent('The Suite has been updated!'));
          initData();
          $scope.hasChanged = false;
        }
      });
    }

    $scope.edit = function () {
      $scope.organizeMode = true;
    }

    $scope.cancel = function () {
      $scope.suite.cases = angular.copy($scope.suite.originCases);
      $scope.listCases = angular.copy($scope.originListCases);
    }

    $scope.remove = function ($index) {
      var caze = $scope.suite.cases.splice($index, 1)[0];
      $scope.listCases.push(caze);
    }

    $scope.removeInListCase = function (caze) {
      _.remove($scope.listCases, function(sel) {
        return sel._id == caze._id;
      });
    }

    $scope.setting = function (ev) {
      $scope.title = 'Test Suite Information';
      $mdDialog.show({
          
        templateUrl: 'app/project/views/keyword/suite-form-dialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        scope: $scope,
        preserveScope: true,
        controller: function() {

          $scope.originSuiteName = $scope.suite.name;
          $scope.originSuiteMode = $scope.suite.sequence_mode;

          $scope.cancel = function() {
            $scope.suite.name = $scope.originSuiteName;
            $scope.suite.sequence_mode = $scope.originSuiteMode;
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            var suite = {};
            suite._id = $scope.suite._id;
            suite.name = $scope.suite.name;
            suite.sequence_mode = $scope.suite.sequence_mode;
            SuiteService.update($scope.projectId, suite, function (data, status) {
              if (status == 200) {
                $mdToast.show($mdToast.simple().position('top right').textContent('The Suite has been updated!'));
                initData();
                $scope.hasChanged = false;
              } else if (status == 204) {
                $mdToast.show($mdToast.simple().position('top right').textContent('Nothing to update.'));
              }

              $mdDialog.cancel();
            });
          };
        }
      })
    }

    $scope.clickToCase = function (ev, caseId) {
      $state.go('app.project.keyword-cases.case', {id : $scope.projectId, caseId : caseId});
    }

	}]);
})