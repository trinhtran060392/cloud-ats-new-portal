define(['project/module','lodash'], function (module, _) {
  
  'use strict';

  module.registerController('ScriptsWizardCtrl', ['$scope', '$rootScope', '$state','$stateParams', '$timeout',
    'ScriptService', 'uuid', '$mdDialog', '$mdToast',
    function($scope, $rootScope, $state, $stateParams, $timeout, ScriptService, uuid, $mdDialog, $mdToast) {
        $scope.$parent.isSidenavOpen = false;
        $scope.$parent.isSidenavLockedOpen = false;

        $scope.projectId = $stateParams.id;
        $scope.scriptId = $stateParams.scriptId;
        $scope.methods = ['GET','POST','PUT','DELETE'];
        $scope.checkTabSampler = false ;
        $scope.hasChanged = false;

        $scope.$watch('selectedIndex', function(current, old) {
          if (current == 1) {
            $scope.checkTabSampler = true ;
          } else {
            $scope.checkTabSampler = false ;
          }
        });

        var initData = function() {
          ScriptService.get($scope.projectId, $scope.scriptId, function (data, status) {
            $scope.script = data;
            $scope.script.originSamplers = angular.copy($scope.script.samplers);

            $scope.script.info = {
              name: $scope.script.name,
              number_threads: $scope.script.number_threads,
              number_engines: $scope.script.number_engines,
              ram_up: $scope.script.ram_up,
              loops: $scope.script.loops
            };

            $scope.script.originInfo = angular.copy($scope.script.info);
            _.forEach($scope.script.samplers, function(sampler, key){
              sampler._id = uuid.new();
              sampler.arguments.push({
                "paramName": "",
                "paramValue": ""
              });
            });
            var overview = {
              name: $scope.script.projectName,
              state: 'app.project.overview',
              data: {
                id: $scope.projectId
              }
            }
            var scripts = {
              name: 'Scripts',
              state: 'app.project.performance-scripts',
              data: {
                id: $scope.projectId
              }
            }
            var script = {
              name: $scope.script.name
            }
            $scope.breadcrumbs = [overview, scripts, script];

            $scope.$watch('script.samplers', function(newSamplers, oldSamplers) {
              if (newSamplers !== oldSamplers && detectChanged(newSamplers, $scope.script.originSamplers)) {
                $scope.hasChanged = true;
              } else {
                $scope.hasChanged = false;
              }
            }, true);

            $scope.$watch('script.info', function(newInfo, oldInfo) {
              if (JSON.stringify(newInfo) !== JSON.stringify($scope.script.originInfo)) {
                $scope.hasChanged = true;
              } else $scope.hasChanged = false;
            }, true);

          })
        };
        var detectChanged = function(newSamplers, oldSamplers) {
          var changed = false;
          if(newSamplers.length !== oldSamplers.length) changed = true;
          else {
            for(var i = 0; i < newSamplers.length; i++) {
              if (newSamplers[i].name !== oldSamplers[i].name) {
                changed = true;
                break;
              }
            }
          }
          return changed;
        }
        initData();

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
                  $mdDialog.hide();
                  $scope.script.samplers.push($scope.selected);
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
          var originSampler = angular.copy(sampler);
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
                  $mdDialog.hide();
                  if (originSampler != $scope.selected) {
                    $scope.hasChanged = true;
                  }
                };
              }
          }).then(function () {
          });
        };

        $scope.updateScript = function(){
          ScriptService.update($scope.projectId, $scope.script, function (data, status) {
            if(status == 202){
              $mdDialog.hide();
              $scope.script.originSamplers = $scope.script.samplers ;
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

        $scope.deleteSampler = function (ev, sampler) {
          _.remove($scope.script.samplers, function(sel) {
                return sel._id === sampler._id;
              });
          $scope.selected = undefined;
        }

  }]);
});