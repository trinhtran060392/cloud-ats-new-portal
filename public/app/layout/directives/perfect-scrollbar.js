define(['layout/module'], function (module) {
  'use strict';

  module.registerDirective('perfectScrollbar', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        $timeout(function () {
          $(element).perfectScrollbar();
        }, 100, false);
      }
    }
  }])
});