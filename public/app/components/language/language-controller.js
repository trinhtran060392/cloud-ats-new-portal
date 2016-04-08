define(['layout/module'], function(app) {
  "use strict";

  return app.registerController('LanguageCtrl', ['$scope', '$rootScope', '$log', 'Language',LanguageCtrl]);

  function LanguageCtrl($scope, $rootScope, $log, Language) {
    
    $rootScope.lang = {};

    Language.getLanguages(function(data) {
      $rootScope.currentImg = 'styles/img/flags/us.png';
      $rootScope.languages = data;
      $rootScope.currentTitle = data[0].title;
      Language.getLang(data[0].key, function(data) {
        $rootScope.lang = data;
      });

      $rootScope.choose = function (lang) {
        $rootScope.currentImg = 'styles/img/flags/'+lang.key+'.png';
        $rootScope.currentTitle = lang.title; 

        Language.getLang(lang.key, function(data) {
          $rootScope.lang = data;
        });
      }

      $rootScope.getWord = function(key) {
        if (angular.isDefined($rootScope.lang[key])) {
          return $rootScope.lang[key];
        } else {
          return key;
        }
      }

    });
  }
});