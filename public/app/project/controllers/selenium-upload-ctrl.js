define(['project/module'], function (module) {
	'use strict';

	module.registerController('SeleniumUploadCtrl', [
    '$scope', '$rootScope', '$state', '$stateParams', '$templateRequest', '$compile', '$cookies','SeleniumUploadService', '$mdDialog',
    function ($scope, $rootScope, $state, $stateParams, $templateRequest, $compile, $cookies, SeleniumUploadService, $mdDialog) {
      
      $scope.showExecutionSeleniumUpload = function(ev) {
        $mdDialog.show({
          templateUrl: 'app/project/views/dialog-execution-selenium-upload.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          scope: $scope,
          preserveScope: true,
          controller: function() {
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.run = function() {
                $mdDialog.hide();
              };
            }
          })
      };
    
	}]);
})