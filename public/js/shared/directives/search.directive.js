(function() {
  'use strict'

  angular.module('rottenPublishers.directives.search', ['rottenPublishers.services.search'])
  .directive('neSearch', neSearch);

  function neSearch() {
    var directive = {
      restrict: 'E',
      replace: 'true',
      templateUrl: '/templates/search.directive.template.html',
      controller: searchController
    }

    return directive;

    searchController.$inject = ['$scope', 'searchService'];
    function searchController($scope, searchService) {
      $scope.search = searchService.data;
    };
  };

})();
