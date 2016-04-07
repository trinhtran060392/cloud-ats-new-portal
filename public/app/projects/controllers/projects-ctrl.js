define(['projects/module'], function (module) {
  'use strict';

  module.registerController('ProjectsCtrl', ['$scope', '$mdBottomSheet', function($scope, $mdBottomSheet) {

    $scope.clickProject = function ($event) {
      $scope.projectName = $event.currentTarget.innerText;
      $mdBottomSheet.show({
        templateUrl: 'app/projects/views/project-bottom-sheet.tpl.html',
        scope: $scope,
        preserveScope: true,
        controller: function () {
          console.log($scope);
        }
      }).then(function (clickedItem) {
        console.log(clickedItem);
      })
    }

  }]);
})