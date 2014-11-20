(function() {
  'use strict'

  angular.module('rottenPublishers.controllers.publisher', [
    'rottenPublishers.services.categories',
    'rottenPublishers.services.publishers',
    'rottenPublishers.services.ratings',
    'rottenPublishers.services.search'
  ])
  .controller('publisherController', publisherController);

  publisherController.$inject = ['$scope', '$location', '$routeParams', 'categories', 'publishers', 'ratings', 'searchService'];
  function publisherController($scope, $location, $routeParams, categories, publishers, ratings, searchService) {
    var vm = this; //view model

    vm.publisherKey = $routeParams.pid;
    vm.publishers = publishers.data;
    vm.categories = categories.data;
    vm.ratings = ratings.data;
    vm.search = searchService.data;
    vm.calcAverage = calcAverage;

    publishers.get(vm.publisherKey)
    .then( function(publishers) {
      vm.publisher = publishers.$getRecord(vm.publisherKey);
    });

    ratings.get(vm.publisherKey)
    .then( function(ratings) {
      vm.rating = vm.ratings[vm.publisherKey];

      vm.calcAverage();
    });

    vm.routeToPublisher = routeToPublisher;
    vm.updateSearch = searchService.update;

    function routeToPublisher(publisher) {
      if (publisher == null || publisher.key === '') {
        return;
      }
      $location.path('/publishers/' + publisher.key);
    };

    function calcAverage() {
      vm.rating.average = (vm.rating.performance + vm.rating.performance + vm.rating.usability + vm.rating.reliability) / 4;
    }

  };

})();
