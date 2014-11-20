(function() {
  'use strict'

  angular.module('rottenPublishers.services.ratings', ['firebase'])
  .factory('ratings', ratings);

  ratings.$inject = ['$firebase'];
  function ratings($firebase) {
    var ratings = new Firebase('https://vivid-heat-6256.firebaseio.com/ratings');
    var sync = $firebase(ratings);

    var service = {
      data: sync.$asObject(),
      get: get
    };

    return service;

    function get(key) {
      return service.data.$loaded();
    };
  };

})();

