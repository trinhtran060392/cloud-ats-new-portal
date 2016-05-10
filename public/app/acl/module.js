define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.acl', ['ui.router']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider', '$urlRouterProvider', 
    function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

    $stateProvider
    .state('app.tenants', {
      url: '/permission',
      views: {
        'content@app': {
          controller: 'TenantCtrl',
          templateUrl: 'app/acl/views/tenants.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/tenants-ctrl'
            ])
          }
        },
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