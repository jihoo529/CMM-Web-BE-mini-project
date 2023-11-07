var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname,'../');
const { db } = require(pathname + "etc/mysql");

router.use('/', express.urlencoded({ extended: true }), (req, res) =>{
    const content = req.body.content;
    const escapedContent = content.replace(/'/g, "''"); //escapted ' => single quote using ''

    const query = `INSERT INTO contents (user_id, name, content) VALUES (${req.session.userId}, '${req.session.loginName}', '${escapedContent}')`;
    //res.send(`${req.session.loginName}: ${req.body.content}`);
    
    db.query(query, function(err, result){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send("Saved successfully");
        }
    })

    console.log(req.body.content);
})

module.exports = router;