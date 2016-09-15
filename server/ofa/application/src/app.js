var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//app.use(express.static(__dirname + '/bower_components'));  
//app.get('/', function(req, res, next) {  
//  res.sendFile(__dirname + '/index.html');
//});

/* save farming messages */

app.post('/farms', function(req, res) {

  /* post params */
  var requestBody = req.body;

  res.json({
    test: true
  });
});

server.listen(30003, function() {
	console.log('OFA server listening in port 30003');
});
