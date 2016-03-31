var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var upload = multer(); // for parsing multipart/form-data
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/Form';

// use remote connection string
// if running in remote server
/*if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}*/

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME;
}


// connect to the database
var db = mongoose.connect(connectionString);


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