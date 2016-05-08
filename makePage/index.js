var http = require('http');

http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html>');
      res.write('<body>');
      res.write('<h1>Page written by node</h1>');
      
      res.write('<h4>request headers</h4>');
      res.write('<pre>');
      res.write(JSON.stringify(req.headers,null,'\n'));
      res.write('</pre>');
      
      res.write('<hr />');
      res.write('</body>');
      res.write('</html>');
      res.end();
}).listen(8124, "127.0.0.1");
console.log('makePage server running at http://127.0.0.1:8124/');
