define(['projects/module','lodash'], function (module, _) {
  'use strict';

  module.registerController('ProjectsCtrl', ['ProjectService', 'SeleniumUploadService', '$scope', '$mdBottomSheet', 'KeywordService', 'PerformanceService', '$mdDialog','$mdToast', function(ProjectService, SeleniumUploadService, $scope, $mdBottomSheet, KeywordService, PerformanceService, $mdDialog, $mdToast) {

    var parse = function (timestamp) {

      var date = new Date(timestamp);
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

      return result;
    }

    ProjectService.list(function (data, status) {
      _.forEach(data, function (project) {
        project.created_date = parse(project.created_date);
      });

      $scope.projects = data;
    });

    $scope.clickProject = function ($event) {
      $scope.projectName = $event.currentTarget.innerText;
      $mdBottomSheet.show({
        templateUrl: 'app/projects/views/project-bottom-sheet.tpl.html',
        scope: $scope,
        preserveScope: true,
        controller: function () {
          // console.log($scope);
        }
      }).then(function (clickedItem) {
        // console.log(clickedItem);
      })
    };

    $scope.showCreateNewProject = function(ev) {
    $mdDialog.show({
      templateUrl: 'app/projects/views/new-project-modal.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $scope,
      preserveScope: true,
      controller: function DialogController($scope, $mdDialog) {
          $scope.newProject ="";
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            ProjectService.create($scope.newProject, function(data, status){
               if (status) {
                $scope.projects.push(data);
                $mdDialog.hide();
                $mdToast.show($mdToast.simple().position('top right').textContent('Create new project success!'));
               }
            });
          };
        }
    }).then(function () {
    });
  };

  $scope.showDeleteProject = function(ev) {
    $mdDialog.show({
        
        templateUrl: 'app/projects/views/delete-project-modal.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function DialogController($scope, $mdDialog) {

            $scope.form = {};
            $scope.$watch('form.projectName', function (newValue, old) {
              if($scope.projectName !== $scope.form.projectName && $scope.form.projectName){
                $scope.wrongName = true;
               } else {
                $scope.wrongName = false;
               };
            });

            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.submit = function() {
              console.log("delete Project");
            };
          }
      })
  }
  
    
  }]);
})