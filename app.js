var express = require('express');
var app = express();
var mysql = require('mysql2');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'TEST_DB'
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
  
    console.log('Connected to MySQL database');
  });


app.get('/login.html', (req, res) => {
    res.sendFile( __dirname + "/public/" + "login.html" );
})


app.get('/process_get', (req, res) => {
    var response = "<p>"+req.query.loginName+"</p><p>"+req.query.loginPassword+"</p>";
    console.log(response);
    res.send(response);
})


var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})
