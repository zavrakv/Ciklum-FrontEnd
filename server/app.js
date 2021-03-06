'use strict';


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 8001;

var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./public/'));
    
    // Any deep link calls should return index.html
    app.use('/*', express.static('./public/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./public'));
    app.use(express.static('./'));
    app.use(express.static('./js'));
    app.use(express.static('./tmp'));
    
    // Any deep link calls should return index.html
    app.use('/*', function (req, res) {
      res.sendFile('public/index.html');
    });
    break;
}

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});