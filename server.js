var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 4000);

// Servce static assets
app.use('/',  express.static(__dirname + '/dist'));
app.use('/images',  express.static(__dirname + '/dist/images'));

// Routes - catch-all to return index.html
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('app listenting on port: ' + app.get('port'));
});
