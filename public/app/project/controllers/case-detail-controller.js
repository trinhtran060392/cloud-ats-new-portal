define(['project/keyword-module', 'lodash'], function (module, _) {
	'use strict';

	module.registerController('CaseDetailCtrl', ['DataService', '$scope', 'KeywordService', 
    'CaseService', '$state', '$stateParams', '$mdDialog', '$mdToast', 'CustomKeywordService',
    function (DataService, $scope, KeywordService, CaseService, $state, $stateParams, $mdDialog, $mdToast, CustomKeywordService) {

    $scope.$parent.isSidenavOpen = false;
    $scope.$parent.isSidenavLockedOpen = false;

		$scope.projectId = $stateParams.id;
    $scope.caseId = $stateParams.caseId;
    $scope.organizeMode = false;
    $scope.filterIsShow = false;
    $scope.keywords = {};
    $scope.selected = [];
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

    var newRow = function(params) {
      var obj = {};
      _.forEach(params, function(param) {
        obj[param] = param + '_value';
      });
      return obj;
    };

    var buildDataset = function(caze) {
      $scope.data = [];
      var params = buildParamList(caze);
      $scope.data.push(newRow(params));
    };

    CaseService.get($scope.projectId, $scope.caseId, function (data, status) {

      $scope.case = data;
      $scope.params = buildParamList(data);
      if (!data.data_driven) {
        buildDataset($scope.case);
      } else {
        $scope.data = JSON.parse(data.data_source);
        $scope.data_name = data.data_name;
      }
      
      _.forEach($scope.data, function (obj) {
        _.forEach($scope.params, function (param) {
          if (!obj[param]) obj[param] = param+'_value';
        });
      });

      $scope.originData = angular.copy($scope.data);

      $scope.originCase = angular.copy($scope.case);

      if (!data.steps.length) {
        $scope.organizeMode = true;

      }
      _.forEach($scope.case.steps, function (step) {
        step.inCurrentCase = true;
      });
    });

    $scope.save = function () {
      CaseService.update($scope.case.project_id, $scope.case, function (data, status){
        switch (status) {
          case 200: 
            $mdToast.show($mdToast.simple().position('top right').textContent('The case has been updated!'));
            $scope.organizeMode = false;
            _.forEach($scope.case.steps, function (step) {
              step.inCurrentCase = true;
            });
            break;
          case 204:
            $mdToast.show($mdToast.simple().position('top right').textContent('There is nothing to update!'));
            $scope.organizeMode = false;
            break;
          default: break; 
        }
      });
    }

    $scope.dropCallBack = function (event, index, item, type, external) {
      if (item._id) {
        _.forEach(item.steps, function (step) {
          $scope.case.steps.splice(index, 0, step);
          index ++;
        });
        _.remove($scope.case.steps, function (step) {
          return !step.type;
        });

        $scope.step = item.steps[0];
      } else {
        //$scope.case.steps.splice(index, 0, item);
        $scope.step = item;
      }
      if ($scope.step.params.length) {
        $mdDialog.show({
          templateUrl: 'app/project/views/keyword/step-data-form-dialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: 'body',
          scope: $scope,
          preserveScope: true,
          controller: function() {
            $scope.cancelDialog = function() {
              $scope.step = $scope.originStep;
              $mdDialog.cancel();
            };
            $scope.submit = function() {
              $mdDialog.cancel();
            };
          }
        })
      }
    }

    $scope.edit = function () {

      $scope.originCase = angular.copy($scope.case);
      $scope.organizeMode = true;
    }

    $scope.cancel = function () {
      console.log($scope.case);
      $scope.case = $scope.originCase;
      $scope.organizeMode = false;
      _.remove($scope.case.steps, function (step) {
        return !step.inCurrentCase;
      });
    }

    $scope.removeStep = function (index) {
      $scope.organizeMode = true;
      $scope.case.steps.splice(index, 1)
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

    var buildParamList = function(caze) {
      var params = [];
      _.forEach(caze.steps, function(step) {
        _.forEach(step.params, function(param) {
          var val = step[param];
          if (val instanceof Object) {
            val = val.value;
          }

          var startIndex = val.indexOf('${');
          var endIndex = val.lastIndexOf('}');
          if (startIndex == 0 && endIndex == (val.length - 1)) {
            var variable = val.substring(startIndex + 2, endIndex);
            if (params.indexOf(variable) == -1) params.push(variable);
          }
        });
      });
      return params;
    };

    //data driven

    $scope.editData = false;

    $scope.changeData = function (){
      $scope.editData = true;
    }

    $scope.addRow = function (ev) {
      $scope.editData = true;
      $scope.data.push(newRow($scope.params));
    }

    $scope.deleteRowDataDriven = function () {


      var objTemp = $scope.data[0];
      _.forEach($scope.selected, function (object) {
        _.remove($scope.data, function (obj) {
          return obj === object;
        });
      });
      $scope.selected = [];
      
      $scope.editData = true;
    }

    $scope.cancelData = function () {
      $scope.data = $scope.originData;
      $scope.editData = false;
    }

    $scope.saveData = function (ev) {
      if($scope.case.data_driven === null) {
        DataService.create($scope.data_name.trim(), $scope.data, $scope.case._id, function(data, status) {
          var obj = {_id : data._id};
          $scope.case.data_driven = obj;
          $mdToast.show($mdToast.simple().position('top right').textContent('Data has been created!'));
        });
      } else {
        DataService.update($scope.data_name.trim(), $scope.data, $scope.case.data_driven._id, function (data, status) {
          
          switch (status) {
            case 304: 
              break;
            case 200:
              $mdToast.show($mdToast.simple().position('top right').textContent('Data has been updated!'));
              $scope.editData = false;
              break;
            default:
              break;
          }
        });
      }
    }
	}]);
})