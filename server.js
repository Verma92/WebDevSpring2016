var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var upload = multer(); // for parsing multipart/form-data
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/Form');


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
/*app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser())*/
require("./public/Project/server/app.js")(app);
require("./public/Assignments/Assignment3/server/app.js")(app);

app.listen(port, ipaddress);