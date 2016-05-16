define(['acl/module', 'lodash'], function (module, _) {

	'use strict';
	module.registerDirective('spaceEditable', ['TenantAdminService', '$mdToast', function (TenantAdminService, $mdToast) {
		return {
			strict: 'EA',
			link: function (scope, element, attrs) {
				var nameTag = element.children().first();
				var editEl = element.children().last();
				var deleteEl = element.find('.delete-space');
				var recover = function () {
					nameTag.show();
					$(element).children().eq(1).hide();
					$(editEl).hide();
					$(deleteEl).show();
				}

				nameTag.on('dblclick', function () {
					$(this).next().show();
					$(this).next().find('input').focus();
					$(this).hide();
					$(editEl).show();
					$(deleteEl).hide();
				});				

				scope.cancelEditable = function (ev, id, index) {
					scope.spaces[index] = angular.copy(scope.originSpaces[index]);
					recover();
				}
				scope.updateSpace = function (ev, id, index) {
					var name = scope.spaces[index].name;
					var space = {
						_id : id,
						name : name
					};
					TenantAdminService.update(space, function (data, status) {
						if (status === 200) {
							scope.spaces[index] = data;
							scope.originSpaces = angular.copy(scope.spaces);
							recover();
							$mdToast.show($mdToast.simple().position('top right').textContent('The space has been updated!'));
						}
					});
				}
			}
		}
	}]);
})