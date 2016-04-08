define(['auth/module'], function(module) {
  "use strict";

  return module.registerDirective('userInfo', ['$rootScope', function($rootScope){
    return {
      restrict: 'A',
      link: function($scope, $element) {
        $rootScope.$watch('context', function(newValue, oldValue) {
          var context = newValue;
          if(context !== undefined) $scope.currentUser = context.user;
        });
      }
    };
  }]);
});
