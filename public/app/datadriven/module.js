define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'ng-file-upload',
  'angular-material-data-table'
], function(ng, couchPotato) {

  'use strict';

  var module = ng.module('app.datadriven', ['ui.router','ngFileUpload', 'md.data.table']);

  module.config(function($stateProvider, $couchPotatoProvider) {
    $stateProvider
      .state('app.datadriven', {
        url: '/datadriven',
        views: {
          "content@app": {
            controller: 'DataCtrl',
            templateUrl: 'app/datadriven/views/data-driven.html',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'datadriven/controllers/data-controller',
                'services/case-service',
                'services/data-service'
              ])
            }
          }
        },
        data: {
          title: 'Data Driven List',
          requireLogin: true
        }
      })
  });

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
})