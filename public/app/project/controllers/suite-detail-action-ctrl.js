define(['project/keyword-module'], function (module) {
  'use strict';

  module.registerController('SuiteActionCtrl', [
    'SharedDataService', '$scope', 
    function(SharedDataService, $scope) {

      $scope.showListCases = function() {
        SharedDataService.isShowListCases = true;
      }
  }]);

})