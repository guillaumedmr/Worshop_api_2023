const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'password',
  database: 'coeurlocal', 
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

module.exports = connection;
