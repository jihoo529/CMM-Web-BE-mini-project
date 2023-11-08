var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TEST_DB'
})

connection.connect();
  
connection.query('SELECT * FROM users WHERE NAME = ?', ['James'], function (error, results, fields) {
    if (error) {
        console.log("error#####",error);
    }
    if(results == isNaN){
        console.log("###");
    }
    console.log("333",results);
    console.log(results[0].PASSWORD)
});
  
connection.end();