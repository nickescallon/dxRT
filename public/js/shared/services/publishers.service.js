(function() {
  'use strict'

  angular.module('rottenPublishers.services.publishers', ['firebase'])
  .factory('publishers', publishers);

  publishers.$inject = ['$firebase'];
  function publishers($firebase) {
    var publishers = new Firebase('https://vivid-heat-6256.firebaseio.com/publishers');
    var sync = $firebase(publishers);

    var service = {
      data: sync.$asArray()
    };

    return service;
  };

})();
