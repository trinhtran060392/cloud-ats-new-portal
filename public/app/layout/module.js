define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.layout', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', '$urlRouterProvider', 
    function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

    $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'root': {
          templateUrl: 'app/layout/views/layout.tpl.html'
        }
      }
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get('$state');
      $state.go('app.dashboard');
    });
  }])

  module.run(['$couchPotato', function ($couchPotato) {
    module.lazy = $couchPotato;
  }]);

  return module;
})