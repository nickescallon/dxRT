(function() {
  'use strict'

  angular.module('rottenPublishers.controllers.home', ['rottenPublishers.services.publishers'])
  .controller('homeController', homeController);

  homeController.$inject = ['publishers'];
  function homeController(publishers) {
    var vm = this; //view model

    vm.publishers = publishers.data;
    vm.select = select;

    function select($event, index) {
      $event.stopPropagation();
      vm.selected = index;
    };
  };

})();
