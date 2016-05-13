define(['project/keyword-module'], function (module) {
  'use strict';

  module.registerController('DataActionCtrl', [
    'SharedDataService', 'DataService', '$scope', '$state', '$stateParams', '$mdDialog',
    function (SharedDataService, DataService, $scope, $state, $stateParams, $mdDialog) {
      $scope.sharedData = SharedDataService;
      $scope.sharedData.hasChanged = false;
      $scope.projectId = $stateParams.id;

      $scope.addNewDataDriven = function ($event) {
        $mdDialog.show({
          clickOutsideToClose: true,
          focusOnOpen: false,
          targetEvent: $event,
          templateUrl: 'app/project/views/keyword/data-add-new.tpl.html',
          scope: $scope,
          preserveScope: true,
          controller: function() {

            $scope.column_name = undefined;
            $scope.data_name = undefined;

            $scope.doAddNewData = function () {
              $scope.dataSource = [];
              var temp = {};
              temp[$scope.column_name] = $scope.column_name + "_value";
              $scope.dataSource.push(temp);
              DataService.create($scope.data_name.trim(), $scope.dataSource, $scope.projectId, null, function(response, status) {
                $mdDialog.cancel();
                var data = {
                  id: $scope.projectId,
                  dataId: response._id
                }
                $state.go('app.project.keyword-data.detail', data)
              });
            }
          }
        });
      }
    }]);
})