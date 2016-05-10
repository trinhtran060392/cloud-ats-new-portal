define(['layout/module'], function (module) {
  'use strict';

  module.registerDirective('autoWidth', [function () {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        var $label = $(element).prev('label');
        if (attributes.value) $label.remove();
      }
    }
  }])
});