const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});