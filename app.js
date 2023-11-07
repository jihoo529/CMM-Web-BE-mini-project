var express = require('express');
var app = express();
var mysql = require('mysql2');
var login_router = require('./routes/login');
var logout_router = require('./routes/logout');

app.use('/', login_router);
//app.use('/logout', logout_router);

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})