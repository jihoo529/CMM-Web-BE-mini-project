var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname,'../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');

// Configure session middleware


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
                req.session.loginName = loginName;
                req.session.userId = results[0].ID;
                //res.sendFile(pathname + "public/index.html");
                res.redirect(`/display/${loginName}`);
                //res.send(response);
                return;
            }
        }
        res.sendFile(pathname + "public/login_fail.html");
    });   
})

router.get('/logout', (req, res) => {
    console.log("logout");
    req.session.loginName = null;
    req.session.userId = null;
    //res.send("Logout successfully");
    res.redirect('/');
})

router.get('/signup_page', (req, res) => {
    //console.log(pathname);
    res.sendFile(pathname + "public/signup.html");
})

router.post('/signup')


module.exports = router;