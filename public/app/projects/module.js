define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.projects', ['ui.router', 'ngMessages']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider.state('app.projects', {
      url: '/projects',
      views: {
        'content@app': {
          controller: 'ProjectsCtrl',
          templateUrl: 'app/projects/views/projects.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'projects/controllers/projects-ctrl'
            ])
          }
        }
      },
      data: {
        title: 'Projects'
      }
    })
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
})