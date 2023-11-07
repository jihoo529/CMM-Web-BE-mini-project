var express = require('express');
var app = express();
var mysql = require('mysql2');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'TEST_DB'
});

//login with GET method
app.post('/process_post', express.urlencoded({ extended: true }), (req, res) => {
    /**
    * Write your code here
    */
})

//login with POST method without MySQL
app.post('/process_post', express.urlencoded({ extended: true }), (req, res) => {
    /**
    * Write your code here
    */
})

//login with POST method with MySQL


var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})