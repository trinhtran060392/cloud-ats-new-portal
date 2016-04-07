define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.dashboard', ['ui.router', 'ngMessages']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider.state('app.dashboard', {
      url: '/dashboard',
      views: {
        'content@app': {
          controller: 'DashboardCtrl',
          templateUrl: 'app/dashboard/views/dashboard.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'dashboard/controllers/dashboard-ctrl',
              'services/dashboard-service',
            ])
          }
        }
      },
      data: {
        title: 'Dashboard'
      }
    });
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
})