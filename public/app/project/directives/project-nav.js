define(['project/module'], function (module) {
  'use strict';

  module.registerDirective('projectNav', ['$state', '$timeout', function ($state, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/project/directives/project-nav.tpl.html',
      link: function (scope, element, attrs) {
        
        scope.state = $state;
        var projectId = $state.params.id;

        if ($state.current.name.indexOf('keyword') != -1) {
          $('#keyword-menu').toggleClass('collapsed');
          var $ul = $('#keyword-menu').find('ul:first');
          $ul.slideToggle(200);
        } else if ($state.current.name.indexOf('performance') != -1) {
          $('#performance-menu').toggleClass('collapsed');
          var $ul = $('#performance-menu').find('ul:first');
          $ul.slideToggle(200);
        }

        scope.active = function (event) {
          var $currentTarget = $(event.currentTarget);
          $(element).find('.ms-navigation-button.active').removeClass('active');
          $currentTarget.addClass('active');
          var stateUrl = $currentTarget.attr('data-state');
          $state.go(stateUrl, {id: projectId});
        }

        scope.expand = function (event) {
          var $currentTarget = $(event.currentTarget);
          var $parent = $currentTarget.closest('.ms-navigation-node.has-children');
          $parent.toggleClass('collapsed');
          var $ul = $parent.find('ul:first');
          $ul.slideToggle(200);
        }
      }
    }
  }]);
});