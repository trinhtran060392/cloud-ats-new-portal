define(['project/keyword-module'], function (module) {
  'use strict';

  module.registerController('SuitesActionCtrl', ['SharedDataService', '$scope', 'SuiteService', '$state', '$stateParams', '$mdDialog',
    function(SharedDataService, $scope, SuiteService, $state, $stateParams, $mdDialog) {

      $scope.projectId = $stateParams.id;
      $scope.sharedData = SharedDataService;
      $scope.create = function (ev) {
        $scope.title = 'Create New Suite';
        $mdDialog.show({
            
          templateUrl: 'app/project/views/keyword/suite-form-dialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {

            $scope.suite = {};
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.submit = function() {
              $scope.suite.cases = [];
              SuiteService.create($scope.projectId, $scope.suite, function (data, status){
                if (status === 201) {
                  $mdDialog.hide();
                  $state.go('app.project.keyword-suites.suite', {id : $scope.projectId, suiteId : data._id});
                }
              });
            };
          }
        })
      }
  }]);
})