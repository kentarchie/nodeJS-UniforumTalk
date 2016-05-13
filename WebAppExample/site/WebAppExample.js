var express  = require('express');
var handlebars = require('express-handlebars')
	.create({'defaultLayout' : 'main'});
var bodyParser = require('body-parser')
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();
app.set('port',process.env.PORT || 3000);
var Port = app.get('port');
var copyYear
var copyYear = new Date().getFullYear();

app.engine("handlebars",handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'static')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

http.createServer(app).listen(Port, function(){
  nodeLogger('Express server listening on port ' + Port);
});

app.use(express.static(__dirname+'/static'));

app.get('/',function(req,res){
  	nodeLogger('Processing base route');
	res.render('home',{copyrightYear:copyYear});
});

app.get('/about',function(req,res){
  	nodeLogger('Processing about route');
	res.render('about',{copyrightYear:copyYear});
});

// 404 catch-all handler (middleware)
app.use(function(req,res,next){
  	nodeLogger('Processing 494 route');
	res.status(404);
	res.render('404');
});

function nodeLogger(str)
{
    console.log('WAE: ' + str);
} // nodeLogger
