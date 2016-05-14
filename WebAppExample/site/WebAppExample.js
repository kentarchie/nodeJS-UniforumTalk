// setup dependent libraries
var express  = require('express');  // routine
var handlebars = require('express-handlebars') // templates
	.create({'defaultLayout' : 'main'});
var bodyParser = require('body-parser')
var http = require('http'); // web server
var path = require('path'); // url manipulation
var fs = require('fs'); // access the local file system
var moment = require("moment");

// initialize stuff
var app = express();
app.set('port',process.env.PORT || 3000); // web server port
var Port = app.get('port');
moment().format();

app.engine("handlebars",handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'static')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// start web server
http.createServer(app).listen(Port, function(){
  nodeLogger('Express server listening on port ' + Port);
});

// tell the system where the static files are
app.use(express.static(__dirname+'/static'));

var copyYear = new Date().getFullYear();

app.get('/',function(req,res){
  	nodeLogger('Processing base route');
	res.render('home',{copyrightYear:copyYear});
});

app.get('/about',function(req,res){
  	nodeLogger('Processing about route');
	res.render('about',{copyrightYear:copyYear});
});

// data API

app.get('/GetStats', function (req, res)
{
	nodeLogger('Starting GetStats');
   res.setHeader('Content-Type', 'application/json');

   var results = {};
	results['returncode']  =  'pass';

   results['earliestDate'] = moment();
   results['latestDate'] = moment();
   results['totalRecords'] = 0;
   results['totalSpent'] = 0.0;
   results['totalStores'] = 0

   // get JSON file into obj
   /*
    {
      "item" : "Tax",
      "store" : "Family Foods",
      "price" : 0.38,
      "date" : "2014-05-19",
      "tags" : ""
    }
   */
   var allData;
   fs.readFile('purchases.json', 'utf8', function (err, data) {
      if (err) throw err;
      allData = JSON.parse(data);
      results['totalRecords'] = allData.length;
      var storeList=[];
      for(var i=0; i< allData.length; ++i) {
          var item=allData[i];
          var itemDate = moment(item['date']);

          if(itemDate < results['earliestDate'])
            results['earliestDate'] = itemDate;

          if(itemDate > results['latestDate'])
            results['latestDate'] = itemDate;

          results['totalSpent'] += item['price'];

          if( storeList.indexOf( item['store']) == -1)
               storeList.push(item['store']);
      }
      results['totalStores'] = storeList.length;
      res.send(JSON.stringify(results));
   });
}); // GetStats

// 404 catch-all handler (middleware)
app.use(function(req,res,next){
  	nodeLogger('Processing 404 route');
	res.status(404);
	res.render('404');
});

// Utilities

function nodeLogger(str)
{
    console.log('WAE: ' + str);
} // nodeLogger
