var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json())


//Triggered when the application is killed by a [CRTL+C] from keyboard
process.on('SIGINT', function() {
  console.log('CRTL+C kill detected');
  process.exit(0);
});

//Triggered when the application is killed
process.on('SIGHUP', function() {
  console.log('Kill detected');
  process.exit(0);
});

app.use('/', function (req, res) {
  console.log(JSON.stringify(req.body));
  res.json({status: "OK"});
}).listen(80, function() {
  console.log("Listening on port 80");
});

