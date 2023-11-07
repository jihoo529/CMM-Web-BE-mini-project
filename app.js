var express = require('express');
var app = express();
var login_router = require('./routes/login');
var post_router = require('./routes/post');
var session = require('express-session');

app.use(
  session({
    secret: 'mysecretkey', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/', login_router);
app.use('/post', post_router);

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})