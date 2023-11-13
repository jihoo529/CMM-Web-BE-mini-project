const { table } = require('console');
var express = require('express');
var router = express.Router();
const path = require('path');
var pathname = path.join(__dirname,'../');
const { db } = require(pathname + "etc/mysql");

router.get('/:name', (req, res)=>{
    //res.sendFile(pathname+'public/index.html');
    //res.send("hi");

    const query = `SELECT name, content, content_id FROM contents`;
    console.log('loginname: ', req.params.name);
    var loginName = req.params.name;

    db.query(query, function(error, results){
        if (error) {
            console.error('Error retrieving data:', error);
        // Handle the error
        } else {
            console.log("########",results);
            //const data = results; // Store the retrieved data in a variable
            // Render the HTML template with the data and send it as the response
            let tableRows = '';

            results.forEach((row) => {
                let editButton = '';
                let deleteButton = '';
                let contentId = row.content_id;
                console.log(row.content);
                if (row.name === loginName) {
                    console.log(row.name+row.content_id);
                    editButton = `<button onclick="showEditForm('${row.content.replace(/'/g, "\\'")}', '${row.content_id}')">Edit</button>`;
                    deleteButton = `<button onclick="deletePost()">Delete</button>`;
                }

                tableRows += `
                    <tr id='${row.content_id}'>
                    <td>${row.name}</td>
                    <td>${row.content}</td>
                    <td>${editButton}</td>
                    <td>${deleteButton}</td>
                    </tr>
                `;
            });

            const html = `
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>Content List</title>
                        <script type="text/javascript">
                            function showEditForm(content, contentId) {
                                console.log(contentId);
                                console.log(document.body.contains(document.getElementById(contentId+'box')));
                                if(document.body.contains(document.getElementById(contentId+'box'))){
                                    return;
                                }
                                else{
                                    console.log(contentId);
                                    const editBox = document.createElement('textarea');
                                    editBox.id = contentId+'box';
                                    editBox.textContent = content;
                                    const box = document.getElementById(contentId);
                                    box.append(editBox);
                                    
                                    const saveButton = document.createElement('button');
                                    saveButton.textContent = 'Save';

                                    saveButton.addEventListener('click', () => {
                                        console.log(contentId);

                                        fetch('/display/${loginName}/edit/'+contentId, {
                                            method: 'POST',
                                            // Add any necessary headers or body data
                                            headers: {
                                                'Content-Type': 'application/json'
                                              },
                                            body: JSON.stringify({ text: editBox.value })
                                        })
                                        .then(response => {
                                            // Handle the response as needed
                                        })
                                        .catch(error => {
                                            // Handle any errors that occur during the request
                                        });
                                    });

                                    // Append the save button to the document body or any desired element
                                    box.appendChild(saveButton);
                                }
                                //location.reload();
                                
                            }
                        </script>
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
            
            //console.log(html);
            //res.send('yes');
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
            res.redirect('/display/'+req.session.loginName);
        }
    })

    console.log(req.body.content);
})

router.post('/:name/edit/:contentId', (req, res) => {
    //console.log(req.body.text);
    //console.log(req.params.name);
    //console.log(req.params.contentId);
    console.log("saved");
    let updatedText = req.body.text;
    let contentId = req.params.contentId;

    const query = `UPDATE CONTENTS SET CONTENT = ? WHERE content_id = ?`;

    db.query(query, [updatedText, contentId], function(err, result){
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log("updated");
            res.redirect('/display/'+req.params.name);
        }
    })
})


module.exports = router;