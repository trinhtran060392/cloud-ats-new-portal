define(['project/keyword-module', 'lodash'], function(module, _) {
  
  'use strict';
  module.registerController('DataCtrl',['SharedDataService', '$mdToast', '$stateParams', '$mdMedia', '$cookies', 'Upload', '$filter', '$rootScope', 
    '$state', '$mdDialog', '$scope', '$templateRequest', '$compile', 'DataService', 
  	function (SharedDataService, $mdToast, $stateParams, $mdMedia, $cookies, Upload, $filter, $rootScope, $state, $mdDialog, $scope, $templateRequest, 
      $compile, DataService) {

      $scope.$parent.isSidenavOpen = true;
      $scope.$parent.isSidenavLockedOpen = $mdMedia('gt-md');

      $scope.$watch(function() { return $mdMedia('gt-md'); }, function(big) {
        $scope.$parent.isSidenavLockedOpen = big;
        $scope.$parent.isSidenavOpen = big;
      });

      $scope.sharedData = SharedDataService;
      $scope.projectId = $stateParams.id;

      $scope.parse = function (timestamp) {

        var date = new Date(timestamp);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

        return result;
      }

      DataService.list($scope.projectId, function (data, status) {
        $scope.sharedData.project = data;
      });

      $scope.clickData = function (ev, id) {
        $state.go('app.project.keyword-data.detail', {id : $scope.projectId, dataId : id});
      }

      $scope.delete = function (ev, id) {
        var confirm = $mdDialog.confirm()
        .title('Would you like to delete your data?')
        .targetEvent(ev)
        .clickOutsideToClose(true)
        .ok('Delete')
        .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
        DataService.delete(id, function (data, status) {
          if (status === 200) {
            _.remove($scope.sharedData.project.datum, function (data) {
              return data._id === id;
            });
            $mdToast.show($mdToast.simple().position('top right').textContent('Delete The Data Success!'));
          }
        });
        }, function() {});
      }
    }]);
})