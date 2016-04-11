define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.project.performance', ['ui.router', 'ngMessages']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider
    .state('app.project.performance-reports', {
      url: '/project/:id/performance/reports',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/reports.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Reports',
        requireLogin: true
      }
    })
    .state('app.project.performance-scripts', {
      url: '/project/:id/performance/scripts',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/scripts.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/scripts-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Scripts',
        requireLogin: true
      }
    })
    .state('app.project.performance-csv', {
      url: '/project/:id/performance/csv',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/csv.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/csv-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance CSV Data',
        requireLogin: true
      }
    })
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
});