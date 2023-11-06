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

//send text
/*
app.post('/process_post', express.urlencoded({ extended: true }), (req, res) => {
    var response = "<p>"+req.body.loginName+"</p><p>"+req.body.loginPassword+"</p>";
    var loginName = req.body.loginName;
    var loginPW = req.body.loginPassword;
    var query = `SELECT * FROM USERS WHERE NAME = ?`;

    db.query(query, [loginName], function(err, results){
        if(err){
            console.log(err);
            return;
        }
        console.log(results[0])
        if(results[0]){
            if(results[0].PASSWORD == loginPW){
            res.send(response);
            return;
            }
        }
        res.send("Incorrenct information");
    });    
})*/

//send file

app.post('/process_post', express.urlencoded({ extended: true }), (req, res) => {

    var response = "<p>"+req.body.loginName+"</p><p>"+req.body.loginPassword+"</p>";
    console.log(req.body.loginName)
    console.log(response);
    var response2 = __dirname + "/public/" + "index.html"; 
    res.sendFile(response2); 
})

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})
