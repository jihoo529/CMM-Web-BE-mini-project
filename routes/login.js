var express = require('express');
var router = express.Router();
const path = require('path');
var mysql = require('mysql2');
var pathname = path.join(__dirname,'../');

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

router.get('/', (req, res) => {
    //res.send(pathname + "/public/login.html");
    //console.log("hi");
    res.sendFile( pathname + "public/login.html" );
})

router.post('/login', express.urlencoded({ extended: true }), (req, res) =>{
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
        console.log(results)
        
        if(results[0]){
            if(results[0].PASSWORD == loginPW){
            res.sendFile(pathname + "public/index.html");
            //res.send(response);
            return;
            }
        }
        res.send("Incorrenct information");
    });   
})

module.exports = router;