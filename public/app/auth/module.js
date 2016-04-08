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
          controller: 'RegisterCtrl',
          templateUrl: 'app/auth/views/register.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'auth/controllers/register-ctrl',
              'auth/directives/compare-pass',
              'auth/directives/email-validate'
            ])
          }
        }
      },
      data:{
        title:'Register'
      }
    }).state('403',  {
      url: '/403.html',
      views: {
        root: {
          templateUrl: 'app/auth/views/errors/403.html'
        }
      },
      data: {
        title: 'Forbidden',
        htmlId: 'extr-page'
      }
    });
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
})