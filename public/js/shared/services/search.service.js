(function() {
  'use strict'

  angular.module('rottenPublishers.services.search', [])
  .factory('searchService', searchService);

  function searchService() {
    var data = {filterString: ''};

    var service = {
      data: data,
      update: update
    };

    function update(string) {
      service.data.filterString = string;
    };

    return service;
  };

})();
