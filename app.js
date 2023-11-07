var express = require('express');
var app = express();
var mysql = require('mysql2');
var router = require('./routes/login')

app.use('/', router);

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})