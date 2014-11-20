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
    vm.userRating = {
      performance: -1,
      usability: -1,
      reliability: -1,
      average: 0
    };

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
    vm.save = save;

    function routeToPublisher(publisher) {
      if (publisher == null || publisher.key === '') {
        return;
      }
      $location.path('/publishers/' + publisher.key);
    };

    function save() {
      vm.publisher.rating = vm.rating.average;
      vm.ratings.$save(vm.rating);
      vm.publishers.$save(vm.publisher);
    }

    function calcAverage() {
      vm.userRating.average = round((vm.userRating.performance + vm.userRating.performance + vm.userRating.usability + vm.userRating.reliability) / 4);
      if (vm.userRating.performance > 0 && vm.userRating.usability > 0 && vm.userRating.reliability > 0){
        vm.rating.performance = round(average(vm.rating.performance, vm.userRating.performance));
        vm.rating.usability = round(average(vm.rating.usability, vm.userRating.usability));
        vm.rating.reliability = round(average(vm.rating.reliability, vm.userRating.reliability));
      }

      vm.rating.average = round((vm.rating.performance + vm.rating.performance + vm.rating.usability + vm.rating.reliability ) / 4);
    }

    function average(a,b) {
      return parseFloat(parseFloat( (a+b)/2 ).toFixed(2));
    }

    function round(num) {
      if (typeof num !== 'number') {
        return 0;
      }
      return Math.round(num * 100) / 100;
    }

  };

})();
