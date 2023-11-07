var express = require('express');
var app = express();
var login_router = require('./routes/login');

app.use('/', login_router);

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})