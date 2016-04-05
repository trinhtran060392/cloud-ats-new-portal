define(['layout/module'], function (module) {
  'use strict';

  module.registerDirective('perfectScrollbar', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        $(element).perfectScrollbar();
      }
    }
  })
});