var express  = require(.express.);
var handlebars = require('express=handlebars')
	.create({'defaultLayout' : 'main'});
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();
app.set('port',process.env.PORT || 3000);
var Port = app.get('port');

app.engine("handlebars",handlebars.engine);
app.set('view engine', 'handlebars');

// handle unknown requests
app.use(
	function(req,res) {
		res.type('text/plain');
		res.status(404);
		res.send('Object not found');
	}
);

app.use(express.static(path.join(__dirname, 'static')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

http.createServer(app).listen(Port, function(){
  nodeLogger("Express server listening on port " + Port);
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/about', function (req, res)
{
  res.send('Grocery Spending Recorder');
});

function nodeLogger(str)
{
    console.log('WAE: ' + str);
} // nodeLogger
