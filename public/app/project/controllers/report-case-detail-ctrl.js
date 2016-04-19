define(['project/module', 'lodash'], function (module, _) {
  'use strict';

  module.registerController('ReportCaseDetailCtrl', ['$compile', '$templateRequest', '$scope', 'KeywordService', '$stateParams','$mdDialog',
   function ($compile, $templateRequest, $scope , KeywordService, $stateParams,$mdDialog) {
    
    $scope.projectId = $stateParams.id;
    $scope.jobId = $stateParams.jobId;
    $scope.caseReportId = $stateParams.caseReportId;
    $scope.jobId = $stateParams.jobId;
    $scope.suiteId = $stateParams.suiteId;
    $scope.suiteReportId = $stateParams.suiteReportId;
    $scope.isShowImage = false;
    $scope.case = '';
    $scope.listStep = [];

    KeywordService.getReportCase($scope.projectId, $scope.jobId, $scope.caseReportId, function(data) {
      
      $scope.case = JSON.parse(data.case);
      if ($scope.case.data_source) {
        $scope.case.data_source = JSON.parse($scope.case.data_source);
      }
      $scope.listStep = data.listStep;
      $scope.skips = $scope.case.skipped_steps;
    });

    var showDialogImage= function(ev) {
      $mdDialog.show({
        templateUrl: 'app/project/views/keyword/dialog-case-image.tpl.html',
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
          }
      }).then(function () {
      });
    };

    $scope.showOutput = function ($event, output) {
      var ele = $event.currentTarget;
      var tr = ele.closest('tr');
      var nextClassTr = $(tr).next().attr('class');
      if (nextClassTr !== 'step-output') {
        $(tr).after('<tr class="step-output"><td colspan="5" width="100%" style="border-top: none;color: mediumblue;">'+output+'</td></tr>');
      } else $(tr).next().remove();
    }

    $scope.showImageByName = function (value, isName) {
      getImage(value, isName); 
    }

    var getImage = function (value, isName) {
      KeywordService.showImage($scope.projectId, $scope.jobId, $scope.suiteId, $scope.suiteReportId, $scope.caseReportId, value, isName, function (data, status) {
           // Prep the response for Base64 encoding
        var uInt8Array = new Uint8Array(data);
        var i = uInt8Array.length;
        var binaryString = new Array(i);
        while (i--)
        {
          binaryString[i] = String.fromCharCode(uInt8Array[i]);
        }
        var data = binaryString.join('');
        // Base64 encoded image and assign it to the scope
        $scope.image = window.btoa(data);
        showDialogImage(); 
      });
    }
  }]);
});