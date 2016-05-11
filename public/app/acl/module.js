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
      url: '/tenants',
      views: {
        'content@app': {
          controller: 'TenantConfCtrl',
          templateUrl: 'app/acl/views/tenants.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/tenants-ctrl',
              'services/space-service'
            ])
          }
        },
      },
      data: {
        title: 'Spaces management',
        requireLogin: true
      }
    })
    .state('app.spaces', {
      url: '/spaces',
      views: {
        'content@app': {
          controller: 'SpacesCtrl',
          templateUrl: 'app/acl/views/spaces.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/spaces-ctrl'
            ])
          }
        },
      }
    })
    .state('app.projectsAcl', {
      url: '/projectsAcl',
      views: {
        'content@app': {
          controller: 'ProjectsAclCtrl',
          templateUrl: 'app/acl/views/projects.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/projects-ctrl'
            ])
          }
        },
      }
    }).state('app.project.config', {
      url: '/project/:id/config',
      views: {
        'content@app': {
          controller: 'ProjectConfCtrl',
          templateUrl: 'app/acl/views/project-config.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/project-config-ctrl'
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