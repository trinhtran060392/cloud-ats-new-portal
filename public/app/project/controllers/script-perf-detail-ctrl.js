define(['project/module', 'lodash'], function (module, _) {

  'use strict';

  module.registerController('ScriptPerfDetailCtrl', 
    ['$scope', '$compile', '$rootScope', '$state','$stateParams', '$cookies', 'Upload', 'ScriptService', 
     '$mdDialog', '$templateRequest',
     function($scope, $compile, $rootScope, $state, $stateParams, $cookies, Upload, ScriptService, $mdDialog, $templateRequest,) {
      $scope.projectId = $stateParams.id;
      $scope.scriptId = $stateParams.scriptId;
      
      ScriptService.get($scope.projectId, $scope.scriptId, function (data, status) {
        $scope.script = data;
        // set value for input slider
        $('#users').slider('setValue', $scope.script.number_threads);
        $('#ramup').slider('setValue', $scope.script.ram_up);
        $('#loops').slider('setValue', $scope.script.loops);
        $('#engines').slider('setValue', $scope.script.number_engines);
        if ($scope.script.csv_files === undefined) {
          $scope.script.csv_files = [];
        }
        $scope.totalData = $scope.script.csv_files;
        if ($scope.totalData.length) {
          $scope.csvSelected = $scope.totalData[0];
          ScriptService.getCsvData($scope.scriptId, $scope.csvSelected._id, function (data, status) {
            $scope.data = data;
            $scope.originData = angular.copy($scope.data);
            reload([$scope.query.limit, $scope.query.page]);
            $scope.originParam = angular.copy($scope.params);
          });
        }
      });

    }]);
});