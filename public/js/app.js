(function() {
  'use strict'

  angular.module('rottenPublishers', [
    //modules
    'ngAnimate',
    'ngRoute',

    //directives
    'rottenPublishers.directives.search',
    'rottenPublishers.directives.filterBox',
    'rottenPublishers.directives.ratingBar',

    //controllers
    'rottenPublishers.controllers.home',
    'rottenPublishers.controllers.publisher'
  ])
  .config(config)

  config.$inject = config.$inject = ['$locationProvider', '$routeProvider'];
  function config($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    //Routes
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.controller.template.html',
        controller: 'homeController',
        controllerAs: 'home'
      })
      .when('/publishers/:pid/', {
        templateUrl: '/templates/publisher.controller.template.html',
        controller: 'publisherController',
        controllerAs: 'pub'
      })
      .otherwise({
        template: '<div>Otherwise!</div>'
      });
  }

})();


