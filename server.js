var express = require('./model/configuration/expressConfig');
var mongoose = require('./model/configuration/mongooseConfig');

var app = express();
mongoose(); //Initialize mongoose configuration

var port = process.env.PORT || 8000;
app.listen(port);
console.log("listening on port " + port + "\n");
















