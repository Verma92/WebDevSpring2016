
var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var upload = multer(); // for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*require("public/Assignments/Assignment3/server.js")(app);*/

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);