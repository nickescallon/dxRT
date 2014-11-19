(function() {
  'use strict'

  angular.module('rottenPublishers.services.search', [])
  .factory('searchService', searchService);

  function searchService() {
    var data = {filterString: ''};

    var service = {
      data: data
    };

    return service;
  };

})();
