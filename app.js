var express = require('express');
var app = express();
var login_router = require('./routes/login');
var display_router = require('./routes/display');
var session = require('express-session');

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'mysecretkey', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use('/', login_router);
app.use('/display', display_router);

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})