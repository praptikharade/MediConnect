const db = require('./TestConnectivity');
let username = document.getElementById("email");
let name = document.getElementById("name");
let password = document.getElementById("pass")

function registerUser(username, name, password) {
    const sql = 'INSERT INTO users (username, name, password) VALUES (?, ?, ?)';
    db.query(sql, [username, name, password], (err, result) => {
        if (err) throw err;
        console.log('User registered successfully');
    });
}

module.exports = registerUser;  