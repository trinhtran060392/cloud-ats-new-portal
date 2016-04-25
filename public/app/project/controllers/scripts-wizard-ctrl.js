define(['project/module','lodash'], function (module, _) {
  
  'use strict';

  module.registerController('ScriptsWizardCtrl', ['$scope', '$rootScope', '$state','$stateParams', '$timeout',
    'ScriptService', 'uuid', '$mdDialog', '$mdToast',
    function($scope, $rootScope, $state, $stateParams, $timeout, ScriptService, uuid, $mdDialog, $mdToast) {
        $scope.projectId = $stateParams.id;
        $scope.UsersPerEngine = 0;
        $scope.NumberOfEngines = 0;
        $scope.Ramup = 0;
        $scope.Loops = 0;
        $scope.scriptId = $stateParams.scriptId;
        $scope.methods = ['GET','POST','PUT','DELETE'];

        ScriptService.get($scope.projectId, $scope.scriptId, function (data, status) {
          $scope.script = data;
          $scope.UsersPerEngine = $scope.script.number_threads;
          $scope.NumberOfEngines = $scope.script.number_engines;
          $scope.Ramup = $scope.script.ram_up;
          $scope.Loops = $scope.script.loops;

          _.forEach($scope.script.samplers, function(sampler, key){
            sampler._id = uuid.new();
            sampler.arguments.push({
              "paramName": "",
              "paramValue": ""
            });
          });
        });
        $scope.showCreateNewSampler= function(ev) {
          var sampler = {
            _id: uuid.new(),
            name: '',
            method: '',
            url: '',
            constant_time: 0,
            arguments: [{
              "paramName": "",
              "paramValue": ""
            }]
          };
          $scope.selected = sampler;

          $mdDialog.show({
            templateUrl: 'app/project/views/performance/dialog-create-sampler.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            scope: $scope,
            preserveScope: true,
            controller: function () {
                $scope.hide = function() {
                  $mdDialog.hide();
                };
                $scope.cancel = function() {
                  $mdDialog.cancel();
                };
                
                $scope.createNewSampler = function (index) {
                  $scope.script.samplers.push($scope.selected);
                  ScriptService.update($scope.projectId, $scope.script, function (data, status) {
                    if(status == 202){
                      $mdDialog.hide();
                      $mdToast.show($mdToast.simple().position('top right').textContent('The Sampler has created'));
                    } else {
                      $mdDialog.hide();
                      $mdToast.show($mdToast.simple().position('top right').textContent('Error create a new Sampler'));
                    }

                  });
                };
              }
          }).then(function () {
          });
        };
        $scope.removeArgument = function (index) {
          $scope.selected.arguments.splice(index, 1);
        };

        $scope.addArgument = function () {
          var param = {'paramName' : '', 'paramValue' : ''};
          $scope.selected.arguments.push(param);
        };

        $scope.showSamplerInfomation= function(ev, sampler) {
          $scope.selected = sampler;
          $mdDialog.show({
            templateUrl: 'app/project/views/performance/dialog-edit-sampler.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            scope: $scope,
            preserveScope: true,
            controller: function () {
                $scope.hide = function() {
                  $mdDialog.hide();
                };
                $scope.cancel = function() {
                  $mdDialog.cancel();
                };
                $scope.updateSampler = function() {
                  ScriptService.update($scope.projectId, $scope.script, function (data, status) {
                    if(status == 202){
                      $mdDialog.hide();
                      $mdToast.show($mdToast.simple().position('top right').textContent('The Sampler has updated'));
                    } else if(status == 204) {
                      $mdDialog.hide();
                      $mdToast.show($mdToast.simple().position('top right').textContent('The Sampler has nothing to update'));
                    } else if(status == 400) {
                      $mdDialog.hide();
                      $mdToast.show($mdToast.simple().position('top right').textContent('The Sampler is not exist'));
                    }

                  });
                };
              }
          }).then(function () {
          });
        };

  }]);
});