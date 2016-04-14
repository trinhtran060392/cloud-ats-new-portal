define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.project.keyword', ['ui.router', 'ngMessages']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider
    .state('app.project.keyword-reports', {
      url: '/project/:id/keyword/reports',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/reports.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/execution-func-ctrl'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Reports',
        requireLogin: true
      }
    })
    .state('app.project.keyword-suites', {
      url: '/project/:id/keyword/suites',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/suites.tpl.html',
          controller: 'SuiteCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/suite-controller',
              'services/suite-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/suites-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Suites',
        requireLogin: true
      }
    })
    .state('app.project.keyword-cases', {
      url: '/project/:id/keyword/cases',
      views: {
        'search-box@app': {
          templateUrl: 'app/project/views/keyword/cases-search-box.tpl.html'
        },
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/cases.tpl.html',
          controller: 'CasesCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/cases-controller',
              'services/case-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/cases-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Cases',
        requireLogin: true
      }
    })
    .state('app.project.keyword-data', {
      url: '/project/:id/keyword/data',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/data-driven.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/data-driven-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Data Driven',
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