var fs = require('fs');  // we need the file system library
var path = require('path');  // library to process file paths
var commandLineArgs = require('command-line-args'); // command line argument processing
 
// define allowed command line args
var cli = commandLineArgs([
  { name: 'fileName', alias: 'f', type: String }
  ,{ name: 'searchString', alias:'s',type: String}
])

// nothing to do if we don't have a file to search and something to search for
// node searchFile filename searchString
var commandName = path.basename(process.argv[1]);
if(process.argv.length < 4) {
    console.log('missing args: node '+commandName+' datafile searchString');
    process.exit();
}
var options = cli.parse(); // parse command line

var fileName = options.fileName;
var searchString = options.searchString;
console.log(commandName + ': fileName=' + fileName + ' searchString='+searchString);

// fs.readFile opens and read the entire contents of fileName
// when done, it calls the function
fs.readFile(fileName, 'utf8', function (err,data) {
  if (err) {
    return console.log(argv[1] + ':' + err);
  }

  var dataLines = data.split('\n');
  for(var i = 0; i< dataLines.length; ++i) {
      dataLines[i] = dataLines[i].trim(); // remove leading/trailing whitespace
      if(dataLines[i].indexOf(searchString) != -1)
         console.log(dataLines[i]);
  }
  console.log("fs.readFile anonymous function completed");
});
console.log("fs.readFile completed");
