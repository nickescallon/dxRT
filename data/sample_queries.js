var Firebase = require('firebase');
var firebaseUrl = 'https://vivid-heat-6256.firebaseio.com/';

//Get top 10 ratings
function topTen() {
  var publishers = [];
  console.log('getting top 10 highest rated publishers');
  var ratings = new Firebase(firebaseUrl + '/ratings');

  ratings.limitToLast(10).on('child_added', function(rating) {
    var publisher = new Firebase( firebaseUrl + '/publishers/' );

    publisher.child( rating.key() ).once('value', function(publisher) {
      console.log( publisher.val() )
      publishers.push( publisher.val() );
    });
  });
};

topTen();
