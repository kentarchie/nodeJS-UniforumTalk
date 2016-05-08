var http = require('http');
var fs = require('fs');  // file system

http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile('index.html', 'utf8', 
          function (err,data) {
            if (err) {
               return console.log(err);
            }
            res.write(data);
            res.end();
          });
}).listen(8124, "127.0.0.1");

console.log('makePage server running at http://127.0.0.1:8124/');
