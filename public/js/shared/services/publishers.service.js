(function() {
  'use strict'

  angular.module('rottenPublishers.services.publishers', [])
  .factory('publishers', publishers);

  function publishers() {

    var service = {
      publishers: { data: [] }
    };

    return service;
  };

})();
