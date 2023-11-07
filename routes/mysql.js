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

  module.exports = { db };