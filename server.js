/**
 * Created by verma on 1/19/2016.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP|| '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
app.get('/hello', function(req, res){
    res.send('Server.js it is');
});
app.listen(port,ipaddress);