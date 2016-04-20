define(['project/module'], function (module) {
  'use strict';

  module.registerController('OverviewHeaderBoxCtrl', ['$scope', 'SharedDataService', function($scope, SharedDataService) {
    $scope.sharedData = SharedDataService;
    console.log($scope.sharedData);
  }]);
});
