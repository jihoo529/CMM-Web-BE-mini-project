var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname,'../');
const { db } = require('./mysql');

router.get('/', (req, res) => {
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

router.get('/logout', (req, res) => {
    console.log("logout");
    res.send("Logout successfully");
})

module.exports = router;