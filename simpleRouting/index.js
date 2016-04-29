var http = require('http'),   // library to act as web server
url = require('url'); // library to manipulate incoming url

http.createServer(function (req, res) {
  setTimeout(function () {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var url_parts = url.parse(req.url);
    console.log(url_parts.pathname);

    switch(url_parts.pathname)
    {
       case '/':
          res.write("display root");
          break;
       case '/one':
          res.write("route one");
          break;
       case '/two':
          res.write("route two");
          break;
       default:
          res.write("oh dear, 404");
    }
    res.end();
  }, 2000);
}).listen(8000);

