const mysql = require('mysql');

const connection = mysql.createConnection({
 host: 'localhost',
 port: 3306,
 user: 'root',
 password: 'S3cur3P4sSw0rD',
 database: 'employee_db'
});

connection.connect((err) => {
 if (err) throw err;
 console.log('Connected to the MySQL server.');
});

module.exports = connection;