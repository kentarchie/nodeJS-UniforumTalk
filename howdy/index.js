// howdy/index.js
var http = require('http');    // need a web server library

// usually this is an anonymous function passed to the createServer call
// below, but I seperated it out to show the parts better
// the req parameter contains information about the sender
// the res parameter is used to send a response back to the browser
function sendHowdy(req, res)
{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Howdy do, Uniforum\n');
  res.end();
} // sendHowdy

// start listening for web traffic
// provide a callback function to be run when a browser connects to
// the web server we are creating.
// the listen function tells the webserver what port and IP address to listen on
http.createServer(sendHowdy).listen(8124, "127.0.0.1");

// write to standard out to tell us it is ready
console.log('Server running at http://127.0.0.1:8124/');
