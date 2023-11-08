var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname,'../');
const { db } = require(pathname + "etc/mysql");

router.get('/', (req, res)=>{
    const query = `SELECT name, content FROM contents`;

    db.query(query, function(error, results){
        if (error) {
            console.error('Error retrieving data:', error);
        // Handle the error
        } else {
            console.log(results);
            const data = results; // Store the retrieved data in a variable
            // Render the HTML template with the data and send it as the response
            let tableRows = '';
            data.forEach((item) => {
              tableRows += `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.content}</td>
                </tr>
              `;
            });

            const html = `
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>Content List</title>
                    </head>
                    <body>
                        <header class="header">
                            <form action="http://127.0.0.1:8081/logout" method="GET"><button class="logout-button">Logout</button></form>
                        </header>
                        <button class="create-post-button" onclick="showPostForm()">Create Post</button>
                        <form id="post-form" class="post-form" action="http://127.0.0.1:8081/display/post" method="post">
                            <textarea class="content-input" name="content" placeholder="Enter your post" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                        <table>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </body>
            </html>
            `;

            res.send(html);
        }
    })
})

router.post('/post', express.urlencoded({ extended: true }), (req, res) =>{
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
            res.redirect('/display');
        }
    })

    console.log(req.body.content);
})

module.exports = router;