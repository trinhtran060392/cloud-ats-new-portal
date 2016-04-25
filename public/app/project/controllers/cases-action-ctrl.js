define(['project/keyword-module'], function (module) {
  'use strict';

  module.registerController('CasesActionCtrl', [
    'SharedDataService', '$scope', 'CaseService', '$state', '$stateParams', '$mdDialog',
    function (SharedDataService, $scope, CaseService, $state, $stateParams, $mdDialog) {
      $scope.projectId = $stateParams.id;
      $scope.sharedData = SharedDataService;

      $scope.create = function (ev) {
        $mdDialog.show({
            
          templateUrl: 'app/project/views/keyword/create-case-dialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {

            $scope.case = {};
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.submit = function() {
              $scope.case.steps = [];
              CaseService.create($scope.projectId, $scope.case, function (data, status){
                if (status === 201) {
                  $mdDialog.hide();
                  $state.go('app.project.keyword-cases.case', {id : $scope.projectId, caseId : data._id});
                }
              });
            };
          }
        })
      }
    }]);
})