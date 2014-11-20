(function() {
  'use strict'

  angular.module('rottenPublishers', [
    //modules
    'ngAnimate',
    'ngRoute',

    //directives
    'rottenPublishers.directives.search',
    'rottenPublishers.directives.filterBox',

    //controllers
    'rottenPublishers.controllers.home'
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
      .otherwise({
        template: '<div>Otherwise!</div>'
      });
  }

})();


