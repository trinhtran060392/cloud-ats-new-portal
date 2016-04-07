define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages',
  'angular-cookies'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.auth', ['ui.router', 'ngMessages', 'ngCookies']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider.state('login', {
      url: '/login',
      views: {
        root: {
          controller: 'LoginCtrl',
          templateUrl: 'app/auth/views/login.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'auth/controllers/login-ctrl'
            ])
          }
        }
      },
      data: {
        title: 'Login'
      }
    }).state('register',{
      url: '/register',
      views:{
        root: {
          templateUrl: 'app/auth/views/register.tpl.html'
        }
      },
      data:{
        title:'Register'
      }
    });
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
})