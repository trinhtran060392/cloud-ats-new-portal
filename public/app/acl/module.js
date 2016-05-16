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
    .state('app.tenant-admin', {
      url: '/tenant-admin',
      views: {
        'content@app': {
          controller: 'TenantAdminCtrl',
          templateUrl: 'app/acl/views/tenant-admin.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/tenant-admin-ctrl',
              'services/tenant-admin-service',
              'acl/directives/space-editable'
            ])
          }
        },
      },
      data: {
        title: 'Tenant Admin',
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
              'acl/controllers/spaces-ctrl',
              'services/space-service',
              'services/tenant-admin-service'
            ])
          }
        },
      },
      data: {
        title: 'Space Admin',
        requireLogin: true
      }
    })
    .state('app.roles', {
      url: '/roles',
      views: {
        'content@app': {
          controller: 'RolesCtrl',
          templateUrl: 'app/acl/views/roles.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'acl/controllers/roles-ctrl',
              'services/role-service',
              'services/space-service'
            ])
          }
        },
      },
      data: {
        title: 'Role Admin',
        requireLogin: true
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
      },
      data: {
        title: 'Project Admin',
        requireLogin: true
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