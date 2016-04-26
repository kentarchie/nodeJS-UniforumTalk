fs = require('fs');

if(process.argv.length <3) {
    console.log('missing args: node searchFile datafile searchString');
    exit();
}

fileName=process.argv[2];
searchString=process.argv[3];
console.log('fileName=' + fileName + ' searchString='+searchString);

fs.readFile(fileName, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  dataLines = data.split('\n');
  for(var i = 0; i< dataLines.length; ++i) {
      if(dataLines[i].indexOf(searchString) != -1)
         console.log('dataLines['+i+']=:'+dataLines[i]+':');
  }
});
