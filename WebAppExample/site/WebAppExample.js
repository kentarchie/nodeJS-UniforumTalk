// setup dependent libraries
var express  = require('express');  // routing
var handlebars = require('express-handlebars') // templates
	.create({'defaultLayout' : 'main'});
var bodyParser = require('body-parser');  //JSON and URL encoding
var http = require('http'); // web server
var path = require('path'); // url manipulation
var fs = require('fs'); // access the local file system
var moment = require("moment"); // dateTime library

// initialize stuff
var app = express();
app.set('port',process.env.PORT || 3000); // web server port
var Port = app.get('port');
moment().format();

// attach templating engine
app.engine("handlebars",handlebars.engine);
app.set('view engine', 'handlebars');

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

// Web Page Routing

app.get('/',function(req,res){
  	nodeLogger('Processing base route');
   // convert the layout and data files into a complete web page
   // substitute the year into the template file
	res.render('home',{copyrightYear:copyYear});
});

app.get('/about',function(req,res){
  	nodeLogger('Processing about route');
	res.render('about',{copyrightYear:copyYear});
});

// data API

app.get('/GetStats', statsCollection);

app.get('/GetItems/dates/:startDate/:endDate', itemsByDates );

// 404 catch-all handler (middleware)
// this is the last the set of routes
// This is run if no other route matches
app.use(function(req,res,next){
  	nodeLogger('Processing 404 route');
	res.status(404);
	res.render('404',{copyrightYear:copyYear});
});

// gather summary data for the /GetStats route
function statsCollection(req,res)
{
	nodeLogger('Starting GetStats');
   res.setHeader('Content-Type', 'application/json');

   var results = {};
	results['returncode']  =  'pass';

   results['earliestDate'] = moment();
   results['latestDate'] = null;
   results['totalRecords'] = 0;
   results['totalSpent'] = 0.0;
   results['totalStores'] = 0

   // the data file is a set of records like this
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
          if(results['latestDate'] == null)
             results['latestDate'] = itemDate 

          if(itemDate.isBefore(results['earliestDate']))
            results['earliestDate'] = itemDate;

          if(itemDate.isAfter(results['latestDate']))
            results['latestDate'] = itemDate;

          results['totalSpent'] += item['price'];

          if( storeList.indexOf( item['store']) == -1)
               storeList.push(item['store']);
      }
      results['totalStores'] = storeList.length;
      res.send(JSON.stringify(results));
   });
} // statsCollection

// filter the set of objects to collect those between two dates
function itemsByDates(req, res)
{
	 nodeLogger('Starting GetItems/date');
    var startMoment = moment(req.params.startDate);
    var endMoment = moment(req.params.endDate);

	 var startDate = startMoment.startOf('day');
	 var endDate = endMoment.endOf('day');

	 nodeLogger('Starting GetItems/date startDate='+startDate+ ' endDate='+endDate);
    var allData;
    fs.readFile('purchases.json', 'utf8', function (err, data) {
        if (err) throw err;
        allData = JSON.parse(data);
        var itemsList=[];
        for(var i=0; i< allData.length; ++i) {
           var item=allData[i];
           var itemDate = moment(item['date']);
         
           if((itemDate > startDate ) && (itemDate < endDate))
              itemsList.push(item);
        }
        res.send(JSON.stringify(itemsList));
    });
} //itemsByDates

// Utilities
function nodeLogger(str)
{
    console.log('WAE: ' + str);
} // nodeLogger
