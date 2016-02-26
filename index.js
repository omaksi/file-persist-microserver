var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');

var glob = require("glob");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.post('/save', function (req, res) {
  // console.log(req.body);
  fs.writeFile('./data/'+req.body.filename, req.body.data, function(err) {
    if(err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200);
    }
  });
});

app.get('/load', function (req, res) {
  fs.readFile(req.body.filename, function read(err, data) {
    if(err) {
      console.log(err);
      res.status(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/list', function (req, res) {
  glob('./data/*.*', function (err, files) {
    if(err) {
      console.log(err);
      res.status(500);
    } else {
      res.json(files);
    }
  });
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
