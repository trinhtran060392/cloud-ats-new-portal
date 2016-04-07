define(['app'], function (app) {
  'use strict';

  app.factory('EventService', ['$http', '$cookies', '$rootScope', '$window', 
    function($http, $cookies, $rootScope, $window){

    var close = function() {
        
      var token = $cookies.get('authToken');

      var request = {
        method: 'GET',
        url: appConfig.RestEntry + '/api/v1/event/close/' + token,
      };

      $http(request).success(function(data, status) {

      });
    };

    var register = function() {
      var token = $cookies.get('authToken');
      var feed = $rootScope.feed === undefined ? new EventSource(appConfig.RestEntry + '/api/v1/event/feed/' + token) : $rootScope.feed;
      $rootScope.feed = feed;

      $window.onbeforeunload = function (e) {
        close();
      }
      // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      //   close();
      // });
      
      return feed;
    }

    return {
      feed: function(callback) {
        var feed = register();
        feed.addEventListener("message", callback, false);  
      }
    }
  }])
});