define(['project/module'], function (module) {
  'use strict';

  module.registerController('OverviewCtrl', ['$scope', '$mdSidenav', '$mdMedia',
    function ($scope, $mdSidenav, $mdMedia                                                                                                                                                                                                                                                                    ) {
    
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

  }]);
})