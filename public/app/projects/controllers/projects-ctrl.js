define(['projects/module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ProjectsCtrl', ['SeleniumUploadService', '$scope', '$mdBottomSheet', 'KeywordService', 'PerformanceService', function(SeleniumUploadService, $scope, $mdBottomSheet, KeywordService, PerformanceService) {

    var loadPerformanceProjects = function() {
      PerformanceService.projects(function (response) {
        if ($scope.projects === undefined) $scope.projects = [];
        $scope.projects.push(response);
        $scope.projects = _.flatten($scope.projects, true);
      });
    };

    var loadKeywordProjects = function() {
      KeywordService.list(function (response) {
        if ($scope.projects === undefined) $scope.projects = [];
        $scope.projects.push(response);
        $scope.projects = _.flatten($scope.projects, true);
      });
    };

    var loadKeywordUploadProjects = function() {
      SeleniumUploadService.list(function (response) {
        if ($scope.projects === undefined) $scope.projects = [];
        $scope.projects.push(response);
        $scope.projects = _.flatten($scope.projects, true);
      });
    };

    loadPerformanceProjects();
    loadKeywordProjects();
    loadKeywordUploadProjects();

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