// makePage.js
var http = require('http');
var fs = require('fs');  // file system

function showPage(req,res)
{
  res.write('<html>');
  res.write('<head>');
  res.write('<style>');
  res.write('pre { border:1px solid blue;}');
  res.write('</style>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>Page written by node</h1>');

  res.write('<h4>request headers</h4>');
  res.write('<pre>');
  res.write(JSON.stringify(req.headers,null,'\n'));
  res.write('</pre>');

  res.write('<hr />');
  res.end();
} // showPage

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  showPage(req,res);
  //console.log('about to read from file');
  fs.readFile('index.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  res.write(data);
  res.end();
});
  //console.log('file stream after piping to res');
  //res.end();
}).listen(8124, "127.0.0.1");

console.log('makePage server running at http://127.0.0.1:8124/');
