const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Testing
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message)
        return;
    }
    console.log('Successfully connected to MySQL database!')
})

module.exports = connection