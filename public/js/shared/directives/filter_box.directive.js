(function() {
  'use strict'

  angular.module('rottenPublishers.directives.filterBox', [])
  .directive('filterBox', filterBox);

  function filterBox() {
    var directive = {
      restrict: 'E',
      templateUrl: '/templates/filter_box.directive.template.html',
      replace: 'true',
      scope: {
        model: '=',
        key: '@',
        handler: '&',
        label: '@'
      }
    }

    return directive;
  };

})();

