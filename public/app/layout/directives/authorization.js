define(['auth/module', 'lodash'], function(module, _) {
  "use strict";

  return module.registerDirective('authorization', ['$rootScope', function($rootScope){
    return {
      restrict: 'E',
      replace: false,
      link: function(scope, element, attributes) {
        var feature = attributes.feature;
        var action = attributes.action;
        var perms = $rootScope.context.user.perms;
        var hasFeature = false;
        var hasAction = false;
        _.forEach(perms, function(perm) {
          var foo = perm.split('@')[0];
          var bar = foo.split(':');
          var cf = bar[0];
          if ("*" === cf || feature === cf) hasFeature = true;
          if (hasFeature) {
            var ca = bar[1];
            if ("*" === ca || action === ca) {
              hasAction = true;
              return;
            }
          }
        });
        if (hasFeature && hasAction) {
          $(element[0]).hide();          
        } else {
          $(element[0]).show();
        }
      }
    };
  }]);
});
