define(['project/keyword-module'], function (module) {
  'use strict';

  module.registerController('DataActionCtrl', [
    'SharedDataService', '$scope', '$state', '$stateParams', '$mdDialog',
    function (SharedDataService, $scope, $state, $stateParams, $mdDialog) {
      $scope.sharedData = SharedDataService;
      $scope.sharedData.hasChanged = false;
    }]);
})