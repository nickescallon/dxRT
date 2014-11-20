(function() {
  'use strict'

  angular.module('rottenPublishers.directives.ratingBar', [])
  .directive('ratingBar', ratingBar);

  function ratingBar() {
    var directive = {
      restrict: 'E',
      templateUrl: '/templates/rating_bar.directive.template.html',
      replace: 'true',
      scope: {
        model: '=',
        label: '@',
        handler: '&'
      },
      link: link
    }

    return directive;

    function link(scope, element, attrs) {
      var d3elem = d3.select(element[0]).select('.rating-bar');
      var data = d3.range(0,10);

      var boxes = d3elem.selectAll('div').data(data)
        .enter().append('div')
        .attr('class', 'rating-box');

      boxes.on('click', handler)

      scope.$watch('model', function(newVal, oldVal) {
        var clickedIndex = newVal;

        boxes.each(function(d, i) {
          var box = d3.select(this);
          if (i <= clickedIndex) {
            box.attr('class', 'rating-box rated'); //dataxu blue
          } else {
            box.attr('class', 'rating-box unrated'); //dataxu grey light
          }

        });
      });

      function handler(d,i) {
        var clickedIndex = i;

        boxes.each(function(d, i) {
          var box = d3.select(this);
          if (i <= clickedIndex) {
            box.attr('class', 'rating-box rated'); //dataxu blue
          } else {
            box.attr('class', 'rating-box unrated'); //dataxu grey light
          }

        });
        scope.$apply(function() {
          scope.model = i;
          scope.handler();
        })
      };

    };

  };

})();
