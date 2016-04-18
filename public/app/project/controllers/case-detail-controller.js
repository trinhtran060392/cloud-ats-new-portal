define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('CaseDetailCtrl', ['$scope', 'KeywordService', 
    'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', 'CustomKeywordService',
    function ($scope, KeywordService, CaseService, $state, $stateParams, $mdDialog, $mdToast, CustomKeywordService) {

    $scope.$parent.isSidenavOpen = false;
    $scope.$parent.isSidenavLockedOpen = false;

		$scope.projectId = $stateParams.id;
    $scope.caseId = $stateParams.caseId;
    $scope.organizeMode = false;
    $scope.filterIsShow = false;
    $scope.keywords = {};

    $scope.types = [
      {value: 'id', text: 'id'},
      {value: 'name', text: 'name'},
      {value: 'link text', text: 'link text'},
      {value: 'css selector', text: 'css selector'},
      {value: 'xpath', text: 'xpath'}
    ]; 

    var getKeywordsByCat = function(cat) {
      var keywords = []
      var keywordList = $scope.keywordList;

      _.forEach(keywordList[cat], function(content, keyword) {
        var keyword = { "type": keyword, "description": content.description };
        var paramsList = content.params;
        var params = [];
        _.forEach(paramsList, function(desc, param) {
          if (param === 'locator') {
            var locator = { "type" : "id", "value": "" };
            keyword.locator = locator;
          } else if (param === 'targetLocator') {
            var locator = { "type": "id", "value": ""};
            keyword.targetLocator = locator;
          } else {
            keyword[param] = "";  
          }
          
          params.push(param);
        })
        keyword.params = params;
        keywords.push(keyword);
      });
      
      return keywords;
    };

    CustomKeywordService.list($scope.projectId, function(response) {
      console.log(response);
      $scope.customs = response;
    });

    KeywordService.getKeywords(function(data) {
      
      var categories = [];
      $scope.keywordList = data;
      _.forEach(data, function(keywords, cat) {
        categories.push(cat);
      });
      $scope.categories = categories;
      _.forEach(categories, function (cat) {
         $scope.keywords[cat] = getKeywordsByCat(cat);
      });
    });

    CaseService.get($scope.projectId, $scope.caseId, function (data, status) {
      $scope.case = data;
      $scope.originCase = angular.copy($scope.case);

      if (!data.steps.length) {
        $scope.organizeMode = true;
      }
    });

    $scope.dropCustom = function (custom) {
      _.forEach(custom.steps, function (step) {
        $scope.case.steps.push(step);
      });
      _.remove($scope.case.steps, function (step) {
        return !step.type;
      });
    }

    $scope.save = function () {
      CaseService.update($scope.case.project_id, $scope.case, function (data, status){
        switch (status) {
          case 200: 
            $mdToast.show($mdToast.simple().position('top right').textContent('The case has been updated!'));
            $scope.organizeMode = false;
            break;
          case 204:
            $mdToast.show($mdToast.simple().position('top right').textContent('There is nothing to update!'));
            $scope.organizeMode = false;
            break;
          default: break; 
        }
      });
    }

    $scope.edit = function () {

      $scope.originCase = angular.copy($scope.case);
      $scope.organizeMode = true;
    }

    $scope.cancel = function () {
      $scope.case = $scope.originCase;
      $scope.organizeMode = false;
    }

    $scope.clickToStep = function (ev, step, $index) {

      $scope.originCase = angular.copy($scope.case);
      $scope.step = angular.copy(step);
      $scope.organizeMode = true;
      $scope.originStep = angular.copy($scope.step);
      $mdDialog.show({
          
        templateUrl: 'app/project/views/keyword/step-data-form-dialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true,
        controller: function() {

          $scope.cancelDialog = function() {
            $scope.step = $scope.originStep;
            $mdDialog.cancel();
          };
          $scope.submit = function() {
            $scope.case.steps[$index] = $scope.step;
            $mdDialog.cancel();
          };
        }
      })
    }

	}]);
})