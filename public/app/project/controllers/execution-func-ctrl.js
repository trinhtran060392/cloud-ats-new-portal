define(['project/module'], function (module) {
  'use strict';

  module.registerController('ExecutionFuncCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

  	$scope.showExecutionFunctional = function(ev) {
      $mdDialog.show({
        templateUrl: 'app/project/views/keyword/execution-function-dialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,

        controller: function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.submit = function() {
            };
          }
        }).then(function () {
        });
    }

  }]);
})