define(['layout/module'], function (module) {
  'use strict';

  module.registerDirective('autoWidth', [function () {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        if (attributes.value) {
          var width = attributes.value.length * 8;
          if (width > 50) {
            element.css('width', width + 'px');
          }
        }
      }
    }
  }])
});