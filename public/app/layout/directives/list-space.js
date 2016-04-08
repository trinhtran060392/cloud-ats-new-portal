define(['layout/module'], function(module) {
  'use strict';

  module.registerDirective('listSpace', ['$rootScope', 'UserService', function($rootScope, UserService) {
    return {
      restrict: 'AE',
      replace: true,
      link: function(scope, element) {
        
        if ($rootScope.context !== undefined && $rootScope.context.space !== undefined) {
          scope.space = $rootScope.context.space.name;
        } else {
          scope.space = 'Public';
        }

        UserService.spaces().then(function(spaces) {
          scope.spaces = spaces;
        });

        scope.select = function(space) {
          if (space === undefined) {
            scope.space = 'Public';
            UserService.go({_id : null});
          } else {
            scope.space = space.name;
            UserService.go(space);
          }
        }
      }
    }
  }]);
});