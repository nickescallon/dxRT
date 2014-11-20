(function() {
  'use strict'

  angular.module('rottenPublishers.controllers.home', [
    'rottenPublishers.services.categories',
    'rottenPublishers.services.publishers',
    'rottenPublishers.services.ratings',
    'rottenPublishers.services.search'
  ])
  .controller('homeController', homeController);

  homeController.$inject = ['categories', 'publishers', 'ratings', 'searchService'];
  function homeController(categories, publishers, ratings, searchService) {
    var vm = this; //view model

    vm.categories = categories.data;
    vm.publishers = publishers.data;
    vm.ratings = ratings.data;
    vm.search = searchService.data;
    // update scores is a util...
    // vm.updateScores = updateScores

    vm.select = select;
    vm.updateSearch = searchService.update;

    function select($event, index) {
      //TODO: this isnt working well...
      $event.preventDefault();
      $event.stopPropagation();
      vm.selected = index;
    };

    function updateScores() {
      console.log('updating')
      for (var key in vm.ratings) {
        var item = vm.publishers.$getRecord(key)
        if (item != null) {
          item.rating = vm.ratings[key].average;

          vm.publishers.$save(item).then(function(something) {
            console.log('record updated', something);
          });
        }
      }
    }
  };

})();
