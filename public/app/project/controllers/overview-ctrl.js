define(['project/module'], function (module) {
  'use strict';

  module.registerController('OverviewCtrl', ['$scope', '$stateParams', '$mdSidenav', '$mdMedia', 'SharedDataService', 'ProjectService',
    function ($scope, $stateParams, $mdSidenav, $mdMedia, SharedDataService, ProjectService) {
    
    $scope.$parent.isSidenavOpen = true;
    $scope.$parent.isSidenavLockedOpen = $mdMedia('gt-md');

    $scope.$watch(function() { return $mdMedia('gt-md'); }, function(big) {
      $scope.$parent.isSidenavLockedOpen = big;
      $scope.$parent.isSidenavOpen = big;
    });
    
    $scope.toggleProjectNavLeft = function() {
      $scope.$parent.isSidenavLockedOpen = false;
      $mdSidenav('project-nav-left').toggle();
    };

    $scope.projectId = $stateParams.id;
    $scope.sharedData = SharedDataService;
    var parse = function (timestamp) {

      var date = new Date(timestamp);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

      return result;
    }


    ProjectService.get($scope.projectId, function (data, status) {
      $scope.sharedData.project = data;
      $scope.sharedData.project.created_date = parse(data.created_date);
      console.log($scope.sharedData);
    });

  }]);
})