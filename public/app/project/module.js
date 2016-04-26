define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.project', ['ui.router', 'ngMessages']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider
    .state('app.project', {
      abstract: true,
      views: {
        'content': {
          templateUrl: 'app/project/views/layout.tpl.html'
        }
      }
    })
    .state('app.project.overview', {
      url: '/project/:id',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/overview.tpl.html',
          controller: 'OverviewCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/controllers/overview-ctrl',
              'project/controllers/overview-header-box-ctrl',
              'project/directives/project-nav',
              'project/services/shared-data-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/overview-header-box.tpl.html',
          controller: 'OverviewHeaderBoxCtrl'
        }
      },
      data: {
        title: 'Project Overview',
        requireLogin: true
      }
    })
    .state('app.project.selenium-upload', {
      url: '/project/:id/selenium/upload',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/selenium-upload.tpl.html',
          controller : 'SeleniumUploadCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/selenium-upload-ctrl',
              'services/selenium-upload-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/selenium-upload-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Selenium Upload',
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