var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname, '../');
const { db } = require(pathname + "etc/mysql");
const session = require('express-session');

// Configure session middleware


router.get('/', (req, res) => {
    res.sendFile(pathname + "public/login.html");
})

router.post('/login', express.urlencoded({ extended: true }), (req, res) => {
    var response = "<p>" + req.body.loginName + "</p><p>" + req.body.loginPassword + "</p>";
    var loginName = req.body.loginName;
    var loginPW = req.body.loginPassword;
    var query = `SELECT * FROM USERS WHERE NAME = ?`;

    db.query(query, [loginName], function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(results[0])
        console.log(results)

        if (results[0]) {
            if (results[0].PASSWORD == loginPW) {
                req.session.loginName = loginName;
                req.session.userId = results[0].ID;
            
                res.redirect('/display');

            }
        }
        res.sendFile(pathname + "public/login_fail.html");
    });
})

router.get('/logout', (req, res) => {
    console.log("logout");
    req.session.loginName = null;
    req.session.userId = null;
    res.redirect('/');
})

router.get('/signup_page', (req, res) => {
    res.sendFile(pathname + "public/signup.html");
})

router.get('/signup_page', (req, res) => {
    //console.log(pathname);
    res.sendFile(pathname + "public/signup.html");
})

router.post('/signup', express.urlencoded({ extended: true }), (req,res) =>{
    var signUpName = req.body.signupName;
    var signUpPassword = req.body.signupPassword;
    var duplicateQuery = "SELECT * FROM USERS WHERE NAME = ?"
    
    db.query(duplicateQuery, [signUpName], function(err, results){
        if(err){
            console.log(err);
            return;
        }

        if(results.length > 0){
            res.sendFile(pathname + "public/signup_fail.html")
        } else {
            var user = "INSERT INTO USERS (NAME, PASSWORD, IS_ADMIN) VALUES (?,?,?)";
            db.query(user, [signUpName, signUpPassword, 0], function(err, result) {
                if (err) {
                    console.error('Error inserting record:', err);
                    res.status(500).send('Error registering username.');
                } else {
                    var html = ``
                    res.send('Your username has been successfully registered.');
                }
            });
        }
    }); 
})


module.exports = router;