(function() {
  'use strict'

  angular.module('rottenPublishers.controllers.home', [
    'rottenPublishers.services.publishers',
    'rottenPublishers.services.ratings'
  ])
  .controller('homeController', homeController);

  homeController.$inject = ['publishers', 'ratings'];
  function homeController(publishers, ratings) {
    var vm = this; //view model

    vm.publishers = publishers.data;
    vm.ratings = ratings.data;
    vm.select = select;

    function select($event, index) {
      //TODO: this isnt working well...
      $event.preventDefault();
      $event.stopPropagation();
      vm.selected = index;
    };
  };

})();
