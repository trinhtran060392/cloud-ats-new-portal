define(['projects/module'], function (module) {
  'use strict';

  module.registerController('ProjectsActionCtrl', [
    'SharedDataService', '$scope', 'ProjectService', '$state', '$stateParams', '$mdDialog', '$mdToast', 
    function (SharedDataService, $scope, ProjectService, $state, $stateParams, $mdDialog, $mdToast) {
      $scope.projectId = $stateParams.id;
      $scope.sharedData = SharedDataService;

      var parse = function (timestamp) {

        var date = new Date(timestamp);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        var result = months[date.getMonth()] +" " + date.getDate() +" "+ date.getFullYear();

        return result;
      };

      $scope.sharedData.projects = [];

      $scope.showCreateNewProject = function(ev) {
        $mdDialog.show({
          templateUrl: 'app/projects/views/new-project-dialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {
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
                    data.created_date = parse(data.created_date);
                    $scope.sharedData.projects.push(data);
                    $mdDialog.hide();
                    $mdToast.show($mdToast.simple().position('top right').textContent('Create New Project Success!'));
                   }
                });
              };
            }
        }).then(function () {
        });
      };
    }]);
})