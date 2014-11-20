(function() {
  'use strict'

  angular.module('rottenPublishers.services.categories', ['firebase'])
  .factory('categories', categories);

  categories.$inject = ['$firebase'];
  function categories($firebase) {
    var categories = new Firebase('https://vivid-heat-6256.firebaseio.com/categories');
    var sync = $firebase(categories);

    var service = {
      data: sync.$asArray()
    };

    return service;
  };

})();

