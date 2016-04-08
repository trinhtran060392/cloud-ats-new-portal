define(['projects/module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ProjectsCtrl', ['SeleniumUploadService', '$scope', '$mdBottomSheet', 'KeywordService', 'PerformanceService', function(SeleniumUploadService, $scope, $mdBottomSheet, KeywordService, PerformanceService) {

    var parse = function (timestamp) {

      var date = new Date(timestamp);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

      return result;
    }

    var loadPerformanceProjects = function() {
      PerformanceService.projects(function (response) {
        _.forEach(response, function (project) {
          project.created_date = parse(project.created_date);
        });

        if ($scope.projects === undefined) $scope.projects = [];
        $scope.projects.push(response);
        $scope.projects = _.flatten($scope.projects, true);
      });
    };

    var loadKeywordProjects = function() {
      KeywordService.list(function (response) {
         _.forEach(response, function (project) {
          project.created_date = parse(project.created_date);
        });

        if ($scope.projects === undefined) $scope.projects = [];
        $scope.projects.push(response);
        $scope.projects = _.flatten($scope.projects, true);
      });
    };

    var loadKeywordUploadProjects = function() {
      SeleniumUploadService.list(function (response) {
         _.forEach(response, function (project) {
          project.created_date = parse(project.created_date);
        });

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